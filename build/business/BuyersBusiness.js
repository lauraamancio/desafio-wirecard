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
const BuyerDatabase_1 = __importDefault(require("../data/BuyerDatabase"));
const BuyersModel_1 = require("../models/BuyersModel");
const IdGenerator_1 = require("./../services/IdGenerator");
class BuyersBusiness {
    constructor(idGenerator = new IdGenerator_1.IdGenerator(), buyerData = new BuyerDatabase_1.default()) {
        this.idGenerator = idGenerator;
        this.buyerData = buyerData;
        this.addBuyer = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, cpf } = input;
                if (!name || !email || !cpf) {
                    throw new Error("Preencha todos os campos corretamente");
                }
                const id = this.idGenerator.generate();
                const newBuyer = new BuyersModel_1.BuyersModel(id, name, email, cpf);
                yield this.buyerData.addBuyer(newBuyer);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = BuyersBusiness;
//# sourceMappingURL=BuyersBusiness.js.map