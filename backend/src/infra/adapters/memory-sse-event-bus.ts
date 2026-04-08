import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import type { DashboardEvent, ISSEEventBus } from '../ports/sse-event-bus.port';

@Injectable()
export class MemorySSEEventBus implements ISSEEventBus {
  private readonly subjects = new Map<string, Subject<DashboardEvent>>();

  publish(event: DashboardEvent): void {
    const subject = this.subjects.get(event.professionalId);
    subject?.next(event);
  }

  subscribe(professionalId: string): AsyncIterable<DashboardEvent> {
    if (!this.subjects.has(professionalId)) {
      this.subjects.set(professionalId, new Subject<DashboardEvent>());
    }
    const subject = this.subjects.get(professionalId)!;

    return {
      [Symbol.asyncIterator]() {
        let resolve: (value: IteratorResult<DashboardEvent>) => void;
        const queue: DashboardEvent[] = [];
        let waiting = false;

        const sub = subject.subscribe((event) => {
          if (waiting && resolve) {
            waiting = false;
            resolve({ value: event, done: false });
          } else {
            queue.push(event);
          }
        });

        return {
          next(): Promise<IteratorResult<DashboardEvent>> {
            if (queue.length > 0) {
              return Promise.resolve({ value: queue.shift()!, done: false });
            }
            waiting = true;
            return new Promise((r) => { resolve = r; });
          },
          return() {
            sub.unsubscribe();
            return Promise.resolve({ value: undefined as unknown as DashboardEvent, done: true });
          },
        };
      },
    };
  }
}
