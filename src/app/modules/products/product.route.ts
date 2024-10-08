import express from "express"
import validateRequest from "../../middlewares/validateRequest"
import { ProductValidations } from "./product.validation"
import { ProductControllers } from "./product.controller"

const router = express.Router()

router.post("/", validateRequest(ProductValidations.createProductValidationSchema), ProductControllers.createProduct);

router.get("/", ProductControllers.getAllProducts);

router.get("/:id", ProductControllers.getSingleProduct);

router.put("/:id", validateRequest(ProductValidations.updateProductValidationSchema), ProductControllers.updateProduct);

router.delete("/:id", ProductControllers.deleteProduct)

export const ProductRoutes = router;