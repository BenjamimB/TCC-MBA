"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModule = void 0;
const common_1 = require("@nestjs/common");
const patient_service_1 = require("./patient.service");
const prisma_patient_repository_1 = require("../infra/adapters/prisma-patient.repository");
let PatientModule = class PatientModule {
};
exports.PatientModule = PatientModule;
exports.PatientModule = PatientModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: patient_service_1.PatientService,
                useFactory: (repo) => new patient_service_1.PatientService(repo),
                inject: [prisma_patient_repository_1.PrismaPatientRepository],
            },
        ],
        exports: [patient_service_1.PatientService],
    })
], PatientModule);
//# sourceMappingURL=patient.module.js.map