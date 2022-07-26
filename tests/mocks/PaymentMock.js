"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMock2 = exports.paymentMock1 = void 0;
const PaymentModel_1 = require("../../src/models/PaymentModel");
const PaymentModel_2 = __importDefault(require("../../src/models/PaymentModel"));
exports.paymentMock1 = new PaymentModel_2.default("id_mock", "client_mock", "buyer_mock", 345, PaymentModel_1.paymentType.BOLETO, PaymentModel_1.paymentStatus.A_PAGAR, 789456123);
exports.paymentMock2 = new PaymentModel_2.default("id_mock2", "client_mock2", "buyer_mock2", 123, PaymentModel_1.paymentType.CARD, PaymentModel_1.paymentStatus.PAGO);
//# sourceMappingURL=PaymentMock.js.map