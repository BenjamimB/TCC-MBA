"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const crypto_1 = require("crypto");
const result_1 = require("../shared/result");
class PatientService {
    repo;
    clock;
    constructor(repo, clock = () => new Date()) {
        this.repo = repo;
        this.clock = clock;
    }
    async findOrCreateByPhone(professionalId, phoneNumber) {
        const existing = await this.repo.findByPhone(professionalId, phoneNumber);
        if (existing) {
            return (0, result_1.ok)(existing);
        }
        const created = await this.repo.create({
            professionalId,
            phoneNumber,
            consentRecordedAt: this.clock(),
        });
        return (0, result_1.ok)(created);
    }
    async updateProfile(id, professionalId, data) {
        const accessError = await this.checkAccess(id, professionalId);
        if (accessError)
            return accessError;
        const updated = await this.repo.update(id, data);
        return (0, result_1.ok)(updated);
    }
    async getById(id, professionalId) {
        const accessError = await this.checkAccess(id, professionalId);
        if (accessError)
            return accessError;
        const patient = await this.repo.findById(id);
        return (0, result_1.ok)(patient);
    }
    async anonymize(id, professionalId) {
        const accessError = await this.checkAccess(id, professionalId);
        if (accessError)
            return accessError;
        const anonymizedPhone = (0, crypto_1.createHash)('sha256').update(id).digest('hex');
        await this.repo.update(id, {
            name: null,
            dateOfBirth: null,
            phoneNumber: anonymizedPhone,
            anonymizedAt: this.clock(),
        });
        return (0, result_1.ok)(undefined);
    }
    async getHistory(id, professionalId) {
        const accessError = await this.checkAccess(id, professionalId);
        if (accessError)
            return accessError;
        const history = await this.repo.findInteractionHistory(id, professionalId);
        return (0, result_1.ok)(history);
    }
    async checkAccess(id, professionalId) {
        const patient = await this.repo.findById(id);
        if (!patient) {
            return (0, result_1.err)({ code: 'PATIENT_NOT_FOUND', id });
        }
        if (patient.professionalId !== professionalId) {
            return (0, result_1.err)({ code: 'UNAUTHORIZED' });
        }
        return null;
    }
}
exports.PatientService = PatientService;
//# sourceMappingURL=patient.service.js.map