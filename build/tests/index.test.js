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
const PaymentModel_1 = require("./../src/models/PaymentModel");
const BuyerDataMock_1 = require("./mocks/BuyerDataMock");
const PaymentDatabaseMock_1 = require("./mocks/PaymentDatabaseMock");
const PaymentBusiness_1 = __importDefault(require("../src/business/PaymentBusiness"));
const IdGeneratorMock_1 = require("./mocks/IdGeneratorMock");
const ClientDataMock_1 = require("./mocks/ClientDataMock");
const CardBusiness_1 = __importDefault(require("../src/business/CardBusiness"));
const CardDatabaseMock_1 = require("./mocks/CardDatabaseMock");
const paymentBusinessMock = new PaymentBusiness_1.default(new IdGeneratorMock_1.IdGeneratorMock, new PaymentDatabaseMock_1.PaymentDataMock, new ClientDataMock_1.ClientDataMock, new BuyerDataMock_1.BuyerDatabaseMock);
const cardBusinessMock = new CardBusiness_1.default(new IdGeneratorMock_1.IdGeneratorMock, new CardDatabaseMock_1.CardDatabaseMock, new BuyerDataMock_1.BuyerDatabaseMock, new PaymentDatabaseMock_1.PaymentDataMock);
describe("Payment table tests", () => {
    test("Test getById, not found payment", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            yield paymentBusinessMock.getPaymentById("test");
        }
        catch (error) {
            expect(error.message).toBe("Payment not found");
        }
    }));
    test("Test generatePayment, client not found", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const client = {
                client_id: "",
                buyer_id: "buyer_id",
                amount: 345,
                type: PaymentModel_1.paymentType.BOLETO,
                status: PaymentModel_1.paymentStatus.A_PAGAR,
                boleto_number: 789456123
            };
            yield paymentBusinessMock.generatePayment(client);
        }
        catch (error) {
            expect(error.message).toBe("This Client doesn't exist");
        }
    }));
    test("Test generatePayment, buyer not found", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const client = {
                client_id: "id_mock",
                buyer_id: "",
                amount: 345,
                type: PaymentModel_1.paymentType.BOLETO,
                status: PaymentModel_1.paymentStatus.A_PAGAR,
                boleto_number: 789456123
            };
            yield paymentBusinessMock.generatePayment(client);
        }
        catch (error) {
            expect(error.message).toBe("This Buyer doesn't exist");
        }
    }));
    test("Test generatePayment, invalid field", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const client = {
                client_id: "id_mock",
                buyer_id: "id_mock1",
                amount: 0,
                type: PaymentModel_1.paymentType.BOLETO,
                status: PaymentModel_1.paymentStatus.A_PAGAR,
                boleto_number: 789456123
            };
            yield paymentBusinessMock.generatePayment(client);
        }
        catch (error) {
            expect(error.message).toBe("Fill in all fields");
        }
    }));
});
describe("Card table tests", () => {
    test("Test addCard, buyer doens't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const clientCard = {
                buyer_id: "id_mock",
                card_holder: "holder name",
                card_number: 1234567897418523,
                card_expiration_date: "02/2028",
                card_cvv: 123
            };
            const clientPay = {
                client_id: "id_mock",
                buyer_id: "id_mock",
                amount: 150,
                type: PaymentModel_1.paymentType.CARD,
                status: PaymentModel_1.paymentStatus.A_PAGAR,
                boleto_number: 0
            };
            yield cardBusinessMock.addCard(clientCard, clientPay);
        }
        catch (error) {
            expect(error.message).toBe("Buyer don't match the card owner");
        }
    }));
    test("Test addCard, missing field", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const clientCard = {
                buyer_id: "id_mock1",
                card_holder: "",
                card_number: 1234567897418523,
                card_expiration_date: "02/2028",
                card_cvv: 123
            };
            const clientPay = {
                client_id: "id_mock",
                buyer_id: "id_mock1",
                amount: 150,
                type: PaymentModel_1.paymentType.CARD,
                status: PaymentModel_1.paymentStatus.A_PAGAR,
                boleto_number: 0
            };
            yield cardBusinessMock.addCard(clientCard, clientPay);
        }
        catch (error) {
            expect(error.message).toBe("Fill in all the fields");
        }
    }));
    test("Test addCard, invalid card expiration date", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const clientCard = {
                buyer_id: "id_mock1",
                card_holder: "holder name",
                card_number: 1234567897418523,
                card_expiration_date: "02/28",
                card_cvv: 123
            };
            const clientPay = {
                client_id: "id_mock",
                buyer_id: "id_mock1",
                amount: 150,
                type: PaymentModel_1.paymentType.CARD,
                status: PaymentModel_1.paymentStatus.A_PAGAR,
                boleto_number: 0
            };
            yield cardBusinessMock.addCard(clientCard, clientPay);
        }
        catch (error) {
            expect(error.message).toBe("Invalid card expiration date format");
        }
    }));
    test("Test addCard, invalid cvv format", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const clientCard = {
                buyer_id: "id_mock1",
                card_holder: "holder name",
                card_number: 1234567897418523,
                card_expiration_date: "02/2028",
                card_cvv: 1234
            };
            const clientPay = {
                client_id: "id_mock",
                buyer_id: "id_mock1",
                amount: 150,
                type: PaymentModel_1.paymentType.CARD,
                status: PaymentModel_1.paymentStatus.A_PAGAR,
                boleto_number: 0
            };
            yield cardBusinessMock.addCard(clientCard, clientPay);
        }
        catch (error) {
            expect(error.message).toBe("Invalid CVV format");
        }
    }));
    test("Test addCard, invalid card format", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const clientCard = {
                buyer_id: "id_mock1",
                card_holder: "holder name",
                card_number: 123,
                card_expiration_date: "02/2028",
                card_cvv: 123
            };
            const clientPay = {
                client_id: "id_mock",
                buyer_id: "id_mock1",
                amount: 150,
                type: PaymentModel_1.paymentType.CARD,
                status: PaymentModel_1.paymentStatus.A_PAGAR,
                boleto_number: 0
            };
            yield cardBusinessMock.addCard(clientCard, clientPay);
        }
        catch (error) {
            expect(error.message).toBe("Not valid card number format");
        }
    }));
    test("Test addCard, expired card", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const clientCard = {
                buyer_id: "id_mock1",
                card_holder: "holder name",
                card_number: 1234567891234567,
                card_expiration_date: "02/2020",
                card_cvv: 123
            };
            const clientPay = {
                client_id: "id_mock",
                buyer_id: "id_mock1",
                amount: 150,
                type: PaymentModel_1.paymentType.CARD,
                status: PaymentModel_1.paymentStatus.A_PAGAR,
                boleto_number: 0
            };
            yield cardBusinessMock.addCard(clientCard, clientPay);
        }
        catch (error) {
            expect(error.message).toBe("Expired card");
        }
    }));
    test("Test addCard, not authorized", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const clientCard = {
                buyer_id: "id_mock1",
                card_holder: "holder name",
                card_number: 1234567891234567,
                card_expiration_date: "02/2028",
                card_cvv: 122
            };
            const clientPay = {
                client_id: "id_mock",
                buyer_id: "id_mock1",
                amount: 150,
                type: PaymentModel_1.paymentType.CARD,
                status: PaymentModel_1.paymentStatus.A_PAGAR,
                boleto_number: 0
            };
            yield cardBusinessMock.addCard(clientCard, clientPay);
        }
        catch (error) {
            expect(error.message).toBe("Payment not authorized");
        }
    }));
});
//# sourceMappingURL=index.test.js.map