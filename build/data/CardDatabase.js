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
const BaseCustomError_1 = require("../error/BaseCustomError");
const BaseDatabase_1 = require("./BaseDatabase");
class CardDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.TABLE_NAME = "card_wirecard";
    }
    addCard(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert(input)
                    .into(this.TABLE_NAME);
            }
            catch (error) {
                throw new BaseCustomError_1.CustomError(500, error.message || "Internal error.");
            }
        });
    }
    getCardId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select()
                    .from(this.TABLE_NAME)
                    .where({ id });
                return result[0];
            }
            catch (error) {
                throw new BaseCustomError_1.CustomError(500, error.message || "Internal error.");
            }
        });
    }
}
exports.default = CardDatabase;
//# sourceMappingURL=CardDatabase.js.map