"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardMock2 = exports.cardMock = void 0;
const CardModel_1 = __importDefault(require("../../src/models/CardModel"));
const mockDate = new Date("2028-11-01T00:00:00.000Z");
exports.cardMock = new CardModel_1.default("id_mock1", "buyer_id1", "name1", 7412589632587412, mockDate, 123);
exports.cardMock2 = new CardModel_1.default("id_mock2", "buyer_id2", "name2", 7418529632589632, mockDate, 321);
//# sourceMappingURL=CardMock.js.map