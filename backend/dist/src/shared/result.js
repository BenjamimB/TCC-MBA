"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = ok;
exports.err = err;
exports.isOk = isOk;
function ok(value) {
    return { ok: true, value };
}
function err(error) {
    return { ok: false, error };
}
function isOk(result) {
    return result.ok;
}
//# sourceMappingURL=result.js.map