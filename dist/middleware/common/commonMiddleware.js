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
exports.paginatedResults = void 0;
/**This middleware returns paginated results and this function expectes a model */
const paginatedResults = (model) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const results = {};
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            if (endIndex < (yield model.countDocuments().exec())) {
                results.next = {
                    page: page + 1,
                    limit: limit,
                };
            }
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit,
                };
            }
            results.results = yield model.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults = results;
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.paginatedResults = paginatedResults;
