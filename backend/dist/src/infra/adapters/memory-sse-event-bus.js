"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemorySSEEventBus = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let MemorySSEEventBus = class MemorySSEEventBus {
    subjects = new Map();
    publish(event) {
        const subject = this.subjects.get(event.professionalId);
        subject?.next(event);
    }
    subscribe(professionalId) {
        if (!this.subjects.has(professionalId)) {
            this.subjects.set(professionalId, new rxjs_1.Subject());
        }
        const subject = this.subjects.get(professionalId);
        return {
            [Symbol.asyncIterator]() {
                let resolve;
                const queue = [];
                let waiting = false;
                const sub = subject.subscribe((event) => {
                    if (waiting && resolve) {
                        waiting = false;
                        resolve({ value: event, done: false });
                    }
                    else {
                        queue.push(event);
                    }
                });
                return {
                    next() {
                        if (queue.length > 0) {
                            return Promise.resolve({ value: queue.shift(), done: false });
                        }
                        waiting = true;
                        return new Promise((r) => { resolve = r; });
                    },
                    return() {
                        sub.unsubscribe();
                        return Promise.resolve({ value: undefined, done: true });
                    },
                };
            },
        };
    }
};
exports.MemorySSEEventBus = MemorySSEEventBus;
exports.MemorySSEEventBus = MemorySSEEventBus = __decorate([
    (0, common_1.Injectable)()
], MemorySSEEventBus);
//# sourceMappingURL=memory-sse-event-bus.js.map