"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
var express_1 = __importDefault(require("express"));
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var order_validation_1 = require("./order.validation");
var order_controller_1 = require("./order.controller");
var router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(order_validation_1.OrderValidations.createOrderValidationSchema), order_controller_1.OrderControllers.createOrder);
exports.OrderRoutes = router;
