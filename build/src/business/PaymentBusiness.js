"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PaymentModel_1 = __importStar(require("./../models/PaymentModel"));
const PaymentDatabase_1 = __importDefault(require("../data/PaymentDatabase"));
const IdGenerator_1 = require("../services/IdGenerator");
const ClientDatabase_1 = __importDefault(require("../data/ClientDatabase"));
const BuyerDatabase_1 = __importDefault(require("../data/BuyerDatabase"));
const BaseCustomError_1 = require("../error/BaseCustomError");
class PaymentBusiness {
    constructor(idGenerator = new IdGenerator_1.IdGenerator(), paymentData = new PaymentDatabase_1.default(), clientData = new ClientDatabase_1.default(), buyerData = new BuyerDatabase_1.default()) {
        this.idGenerator = idGenerator;
        this.paymentData = paymentData;
        this.clientData = clientData;
        this.buyerData = buyerData;
        this.generatePayment = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { client_id, buyer_id, amount, type } = input;
                let { status, boleto_number } = input;
                const validClient = yield this.clientData.getByID(client_id);
                if (!validClient) {
                    throw new BaseCustomError_1.CustomError(404, "This Client doesn't exist");
                }
                const validBuyer = yield this.buyerData.getByID(buyer_id);
                if (!validBuyer) {
                    throw new BaseCustomError_1.CustomError(404, "This Buyer doesn't exist");
                }
                if (!client_id || !buyer_id || !amount || !type) {
                    throw new BaseCustomError_1.CustomError(422, "Fill in all fields");
                }
                if (type !== PaymentModel_1.paymentType.BOLETO && type !== PaymentModel_1.paymentType.CARD) {
                    throw new BaseCustomError_1.CustomError(422, "Invalid type of transaction");
                }
                if (!status) {
                    status = PaymentModel_1.paymentStatus.A_PAGAR;
                }
                if (type === PaymentModel_1.paymentType.CARD) {
                    status = PaymentModel_1.paymentStatus.PAGO;
                    boleto_number = null;
                }
                if (type === PaymentModel_1.paymentType.BOLETO) {
                    boleto_number = Date.now();
                }
                const id = this.idGenerator.generate();
                const newPayment = new PaymentModel_1.default(id, client_id, buyer_id, amount, type, status, boleto_number);
                yield this.paymentData.generatePayment(newPayment);
                return newPayment;
            }
            catch (error) {
                throw new BaseCustomError_1.CustomError(400, error.message);
            }
        });
        this.getPaymentById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.paymentData.getPaymentById(id);
                if (!result) {
                    throw new BaseCustomError_1.CustomError(404, "Payment not found");
                }
                return (result);
            }
            catch (error) {
                throw new BaseCustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.default = PaymentBusiness;
//# sourceMappingURL=PaymentBusiness.js.map