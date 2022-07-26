"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const BuyerController_1 = __importDefault(require("./controller/BuyerController"));
const ClientConroller_1 = __importDefault(require("./controller/ClientConroller"));
const PaymentController_1 = __importDefault(require("./controller/PaymentController"));
const buyerConroller = new BuyerController_1.default();
const clientController = new ClientConroller_1.default();
const paymentController = new PaymentController_1.default();
app_1.app.get("/payment/:payment_id", paymentController.getPaymentById);
app_1.app.post("/buyers", buyerConroller.addBuyer);
app_1.app.post("/clients", clientController.addClient);
app_1.app.post("/payment/:client_id/:buyer_id", paymentController.generatePayment);
//# sourceMappingURL=index.js.map