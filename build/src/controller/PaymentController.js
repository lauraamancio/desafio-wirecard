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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PaymentModel_1 = require("./../models/PaymentModel");
const PaymentBusiness_1 = __importDefault(require("../business/PaymentBusiness"));
const CardBusiness_1 = __importDefault(require("../business/CardBusiness"));
const BuyersBusiness_1 = __importDefault(require("../business/BuyersBusiness"));
class PaymentController {
    constructor(paymentBusiness = new PaymentBusiness_1.default(), cardBusiness = new CardBusiness_1.default(), buyerBusiness = new BuyersBusiness_1.default()) {
        this.paymentBusiness = paymentBusiness;
        this.cardBusiness = cardBusiness;
        this.buyerBusiness = buyerBusiness;
        this.generatePayment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client_id = req.params.client_id;
                const buyer_id = req.params.buyer_id;
                const { amount, type, status, card_holder, card_number, card_expiration_date, card_cvv, boleto_number } = req.body;
                if (type === PaymentModel_1.paymentType.CARD) {
                    const inputCard = {
                        buyer_id,
                        card_holder,
                        card_number,
                        card_expiration_date,
                        card_cvv
                    };
                    const inputPayment = {
                        client_id,
                        buyer_id,
                        type,
                        amount,
                        status,
                    };
                    const result = yield this.cardBusiness.addCard(inputCard, inputPayment);
                    yield this.paymentBusiness.generatePayment(inputPayment);
                    res.send(result);
                }
                else {
                    const inputBoleto = {
                        client_id,
                        buyer_id,
                        type,
                        amount,
                        status,
                        boleto_number
                    };
                    const result = yield this.paymentBusiness.generatePayment(inputBoleto);
                    res.status(201).send({ message: `Boleto number: ${result.getBoletoNumber()}` });
                }
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ message: error.message });
            }
        });
        this.getPaymentById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.payment_id;
                const paymentResult = yield this.paymentBusiness.getPaymentById(id);
                res.status(200).send({
                    Data: paymentResult
                });
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ message: error.message });
            }
        });
    }
}
exports.default = PaymentController;
//# sourceMappingURL=PaymentController.js.map