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
const BuyersBusiness_1 = __importDefault(require("../business/BuyersBusiness"));
class BuyerController {
    constructor(buyerBusiness = new BuyersBusiness_1.default()) {
        this.buyerBusiness = buyerBusiness;
        this.addBuyer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, cpf } = req.body;
                const input = {
                    name,
                    email,
                    cpf
                };
                yield this.buyerBusiness.addBuyer(input);
                res.status(201).send({ message: "Usuário cadastrado com sucesso" });
            }
            catch (error) {
                res.status(400).send(error.sqlmessage || error.message);
            }
        });
    }
}
exports.default = BuyerController;
//# sourceMappingURL=BuyerController.js.map