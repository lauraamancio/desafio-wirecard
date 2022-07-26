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
exports.CardDatabaseMock = void 0;
const CardMock_1 = require("./CardMock");
class CardDatabaseMock {
    addCard(input) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getCardId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (id) {
                case "id_mock1":
                    return CardMock_1.cardMock;
                case "id_mock2":
                    return CardMock_1.cardMock2;
                default:
                    return undefined;
            }
        });
    }
}
exports.CardDatabaseMock = CardDatabaseMock;
//# sourceMappingURL=CardDatabaseMock.js.map