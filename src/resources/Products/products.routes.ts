import express from "express";
import {
    deleteProductsHandler,
    getProductsHandler,
    insertProductHandler,
    updateProductHandler,
} from "./products.controllers";
import validateResource from "../../middlewares/validate-resource";
import {
    filterProductSchema,
    insertProductSchema,
    updateProductSchema,
} from "./product.schema";

const productsRouter = express.Router();

productsRouter.get(
    "/",
    validateResource(filterProductSchema),
    getProductsHandler
);

productsRouter
    .route("")
    .post(validateResource(insertProductSchema), insertProductHandler);

productsRouter
    .route("/:id")
    .patch(validateResource(updateProductSchema), updateProductHandler);

productsRouter.delete("/:id", deleteProductsHandler);

export default productsRouter;
