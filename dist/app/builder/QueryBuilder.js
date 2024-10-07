"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryBuilder = /** @class */ (function () {
    function QueryBuilder(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    QueryBuilder.prototype.search = function (searchableFields) {
        var _a;
        var searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(function (field) {
                    var _a;
                    return (_a = {},
                        _a[field] = {
                            $regex: searchTerm,
                            $options: 'i'
                        },
                        _a);
                })
            });
        }
        return this;
    };
    QueryBuilder.prototype.filter = function () {
        var _a, _b, _c, _d;
        var categories = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.category) === null || _b === void 0 ? void 0 : _b.split(",");
        var tags = (_d = (_c = this === null || this === void 0 ? void 0 : this.query) === null || _c === void 0 ? void 0 : _c.tags) === null || _d === void 0 ? void 0 : _d.split(",");
        if (categories === null || categories === void 0 ? void 0 : categories.length) {
            this.modelQuery = this.modelQuery.find({ category: { $in: categories } });
        }
        if (tags === null || tags === void 0 ? void 0 : tags.length) {
            this.modelQuery = this.modelQuery.find({ tags: { $all: tags } });
        }
        return this;
    };
    QueryBuilder.prototype.sort = function () {
        var _a, _b, _c, _d;
        var sort = (_d = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(",")) === null || _c === void 0 ? void 0 : _c.join(" ")) !== null && _d !== void 0 ? _d : '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    };
    QueryBuilder.prototype.paginate = function () {
        var _a, _b;
        var page = Number((_a = this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        var limit = Number((_b = this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        var skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    };
    QueryBuilder.prototype.fields = function () {
        var _a, _b, _c, _d;
        var fields = (_d = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(",")) === null || _c === void 0 ? void 0 : _c.join(" ")) !== null && _d !== void 0 ? _d : '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    };
    return QueryBuilder;
}());
exports.default = QueryBuilder;
