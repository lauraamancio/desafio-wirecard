"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyersModel = void 0;
class BuyersModel {
    constructor(id, name, email, cpf) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.cpf = cpf;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getCpf() {
        return this.cpf;
    }
    static toBuyerModel(buyer) {
        return new BuyersModel(buyer.id, buyer.name, buyer.email, buyer.cpf);
    }
}
exports.BuyersModel = BuyersModel;
//# sourceMappingURL=BuyersModel.js.map