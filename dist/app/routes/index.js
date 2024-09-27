"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var product_route_1 = require("../modules/products/product.route");
var order_route_1 = require("../modules/orders/order.route");
var router = express_1.default.Router();
var moduleRoutes = [
    {
        path: "/products",
        route: product_route_1.ProductRoutes
    },
    {
        path: "/orders",
        route: order_route_1.OrderRoutes
    }
];
moduleRoutes.forEach(function (route) { return router.use(route.path, route.route); });
exports.default = router;
