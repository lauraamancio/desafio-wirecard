"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentStatus = exports.paymentType = void 0;
var paymentType;
(function (paymentType) {
    paymentType["CARD"] = "CART\u00C3O DE CR\u00C9DITO";
    paymentType["BOLETO"] = "BOLETO";
})(paymentType = exports.paymentType || (exports.paymentType = {}));
var paymentStatus;
(function (paymentStatus) {
    paymentStatus["A_PAGAR"] = "A PAGAR";
    paymentStatus["PAGO"] = "PAGO";
})(paymentStatus = exports.paymentStatus || (exports.paymentStatus = {}));
class PaymentModel {
    constructor(id, client_id, buyer_id, amount, type, status, boleto_number) {
        this.id = id;
        this.client_id = client_id;
        this.buyer_id = buyer_id;
        this.amount = amount;
        this.type = type;
        this.status = status;
        this.boleto_number = boleto_number;
    }
    getId() {
        return this.id;
    }
    getClientId() {
        return this.client_id;
    }
    getBuyerId() {
        return this.buyer_id;
    }
    getAmount() {
        return this.amount;
    }
    getType() {
        return this.type;
    }
    getStatus() {
        return this.status;
    }
    getBoletoNumber() {
        return this.boleto_number;
    }
    static todoBuyerModel(payment) {
        return new PaymentModel(payment.id, payment.client_id, payment.buyer_id, payment.amount, payment.type, payment.status, payment.boleto_number);
    }
}
exports.default = PaymentModel;
//# sourceMappingURL=PaymentModel.js.map