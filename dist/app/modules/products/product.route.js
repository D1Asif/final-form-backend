"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
var express_1 = __importDefault(require("express"));
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var product_validation_1 = require("./product.validation");
var product_controller_1 = require("./product.controller");
var router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(product_validation_1.ProductValidations.createProductValidationSchema), product_controller_1.ProductControllers.createProduct);
router.get("/", product_controller_1.ProductControllers.getAllProducts);
router.get("/:id", product_controller_1.ProductControllers.getSingleProduct);
router.put("/:id", (0, validateRequest_1.default)(product_validation_1.ProductValidations.updateProductValidationSchema), product_controller_1.ProductControllers.updateProduct);
router.delete("/:id", product_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
