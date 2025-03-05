import { NextFunction, Request, Response } from "express";
import prisma from "../../db";
import { CustomError } from "../../middlewares/handle-error";
import {
    FilterProductsInput,
    InsertProductInput,
    UpdateProductInput,
} from "./product.schema";

export const deleteProductsHandler = async (
    req: Request<{ id: string | string[] }, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (typeof id === "string") {
            const product = await prisma.products.update({
                where: {
                    id: id,
                },
                data: {
                    is_active: false,
                },
            });
            return res
                .status(204)
                .json({ product, message: "Product deleted successfully" });
        }

        const products = await prisma.products.updateMany({
            where: {
                id: {
                    in: id,
                },
            },
            data: {
                is_active: false,
            },
        });

        return res.status(204).json(products);
    } catch (error: any) {
        console.log("[DELETE_PRODUCT_ERROR]:", error);
        next(new CustomError(error.message, error.statusCode));
    }
};

export const updateProductHandler = async (
    req: Request<{ id: string }, {}, UpdateProductInput["body"]>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { name, price, quantity, image_urls } = req.body;

        const product = await prisma.products.findFirst({
            where: {
                id: id,
            },
        });

        if (!product) {
            throw {
                message: "Product not found",
            };
        }

        const updatedProduct = await prisma.products.update({
            where: {
                id: id,
            },
            data: {
                name: name || product.name,
                price: price ? parseFloat(price) : product.price,
                quantity: quantity ? +quantity : product.quantity,
                image_urls: image_urls || product.image_urls,
            },
        });

        return res.status(201).json({ data: updatedProduct });
    } catch (error: any) {
        console.log("[UPDATE_PRODUCT_ERROR]:", error);
        next(new CustomError(error.message, error.statusCode));
    }
};

export const insertProductHandler = async (
    req: Request<{}, {}, InsertProductInput["body"]>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, price, quantity, image_urls } = req.body;
        const product = await prisma.products.create({
            data: {
                name,
                price: parseFloat(price),
                quantity: +quantity,
                image_urls,
            },
        });

        return res.status(201).json({ data: product });
    } catch (error: any) {
        console.log("[INSERT_PRODUCT_ERROR]:", error);
        next(new CustomError(error.message, error.statusCode));
    }
};

export const getProductsHandler = async (
    req: Request<{}, {}, {}, FilterProductsInput["query"]>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { created_at, id, is_active, name, price, quantity, updated_at } =
            req.query;
        const products = await prisma.products.findMany({
            where: {
                id: id ? { equals: id } : undefined,
                name: name ? { contains: name } : undefined,
                price: price ? { gte: parseFloat(price) } : undefined,
                quantity: quantity ? { equals: +quantity } : undefined,
                created_at: created_at
                    ? { gte: new Date(created_at) }
                    : undefined,
                updated_at: updated_at
                    ? { gte: new Date(updated_at) }
                    : undefined,
                is_active: true,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        return res.status(201).json({ count: products.length, data: products });
    } catch (error: any) {
        console.log("[FETCH_USERS_ERROR]:", error);
        next(new CustomError(error.message, error.statusCode));
    }
};
