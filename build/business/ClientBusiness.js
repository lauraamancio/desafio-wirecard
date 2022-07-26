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
const ClientDatabase_1 = __importDefault(require("../data/ClientDatabase"));
const IdGenerator_1 = require("../services/IdGenerator");
class ClientBusiness {
    constructor(idGenerator = new IdGenerator_1.IdGenerator(), clientDatabase = new ClientDatabase_1.default()) {
        this.idGenerator = idGenerator;
        this.clientDatabase = clientDatabase;
        this.addClient = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = this.idGenerator.generate();
                yield this.clientDatabase.addClient(id);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = ClientBusiness;
//# sourceMappingURL=ClientBusiness.js.map