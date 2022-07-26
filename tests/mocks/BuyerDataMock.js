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
exports.BuyerDatabaseMock = void 0;
const BuyerMock_1 = require("./BuyerMock");
class BuyerDatabaseMock {
    insert(buyer) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (email) {
                case "email1@gmail.com":
                    return BuyerMock_1.Buyer1;
                case "email2@gmail.com":
                    return BuyerMock_1.Buyer2;
                default:
                    return undefined;
            }
        });
    }
    getByCpf(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (cpf) {
                case 74185245963:
                    return BuyerMock_1.Buyer1;
                case 85134978901:
                    return BuyerMock_1.Buyer2;
                default:
                    return undefined;
            }
        });
    }
    getByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (id) {
                case "id_mock1":
                    return BuyerMock_1.Buyer1;
                case "id_mock2":
                    return BuyerMock_1.Buyer2;
                default:
                    return undefined;
            }
        });
    }
}
exports.BuyerDatabaseMock = BuyerDatabaseMock;
//# sourceMappingURL=BuyerDataMock.js.map