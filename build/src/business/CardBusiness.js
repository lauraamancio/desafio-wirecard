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
const BuyerDatabase_1 = __importDefault(require("../data/BuyerDatabase"));
const CardDatabase_1 = __importDefault(require("../data/CardDatabase"));
const PaymentDatabase_1 = __importDefault(require("../data/PaymentDatabase"));
const BaseCustomError_1 = require("../error/BaseCustomError");
const ValidCardsArrayMock_1 = require("../mocks/ValidCardsArrayMock");
const CardModel_1 = __importDefault(require("../models/CardModel"));
const PaymentModel_1 = __importStar(require("../models/PaymentModel"));
const IdGenerator_1 = require("../services/IdGenerator");
class CardBusiness {
    constructor(idGenerator = new IdGenerator_1.IdGenerator(), cardData = new CardDatabase_1.default(), buyerData = new BuyerDatabase_1.default(), paymentData = new PaymentDatabase_1.default()) {
        this.idGenerator = idGenerator;
        this.cardData = cardData;
        this.buyerData = buyerData;
        this.paymentData = paymentData;
        this.addCard = (input, inputPay) => __awaiter(this, void 0, void 0, function* () {
            const { buyer_id, card_holder, card_number, card_expiration_date, card_cvv } = input;
            const { client_id, type, amount } = inputPay;
            let { status } = inputPay;
            const [month, year] = card_expiration_date.split("/");
            const card_expirationFormat = new Date(`${year}-${month}-01`);
            if (!buyer_id || !card_holder || !card_number || !card_expiration_date || !card_cvv) {
                throw new BaseCustomError_1.CustomError(422, "Fill in all the fields");
            }
            if (!card_expiration_date.includes("/") || card_expiration_date.length !== 7) {
                throw new BaseCustomError_1.CustomError(400, "Invalid card expiration date format");
            }
            if (card_cvv.toString().length !== 3) {
                throw new BaseCustomError_1.CustomError(400, "Invalid CVV format");
            }
            if (card_number.toString().length !== 16) {
                throw new BaseCustomError_1.CustomError(400, "Not valid card number format");
            }
            const validBuyer = yield this.buyerData.getByID(buyer_id);
            if (!validBuyer) {
                throw new BaseCustomError_1.CustomError(404, "Buyer don't match the card owner");
            }
            if (card_expirationFormat.getTime() < Date.now()) {
                const id = this.idGenerator.generate();
                status = PaymentModel_1.paymentStatus.A_PAGAR;
                const newPayment = new PaymentModel_1.default(id, client_id, buyer_id, amount, type, status);
                yield this.paymentData.generatePayment(newPayment);
                throw new BaseCustomError_1.CustomError(400, "Expired card");
            }
            if (!ValidCardsArrayMock_1.validCards.includes(card_cvv)) {
                const id = this.idGenerator.generate();
                status = PaymentModel_1.paymentStatus.A_PAGAR;
                const newPayment = new PaymentModel_1.default(id, client_id, buyer_id, amount, type, status);
                yield this.paymentData.generatePayment(newPayment);
                throw new BaseCustomError_1.CustomError(401, "Payment not authorized");
            }
            else {
                const id = this.idGenerator.generate();
                const newCard = new CardModel_1.default(id, buyer_id, card_holder, card_number, card_expirationFormat, card_cvv);
                yield this.cardData.addCard(newCard);
                return ({ message: "Payment authorized" });
            }
        });
    }
}
exports.default = CardBusiness;
//# sourceMappingURL=CardBusiness.js.map