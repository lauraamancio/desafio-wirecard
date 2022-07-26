"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentDataMock = void 0;
const PaymentMock_1 = require("./PaymentMock");
class PaymentDataMock {
    getPaymentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (id) {
                case "id_mock":
                    return PaymentMock_1.paymentMock1;
                case "id_mock2":
                    return PaymentMock_1.paymentMock2;
                default:
                    return undefined;
            }
        });
    }
    generatePayment(input) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.PaymentDataMock = PaymentDataMock;
//# sourceMappingURL=PaymentDatabaseMock.js.map