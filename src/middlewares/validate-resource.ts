import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
const validateResource =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (e: any) {
            console.log("The validate errors:", e);
            return res.status(400).send({
                success: false,
                error: ` ${e.errors[0].path[1]} error. ${e.errors[0].message}`,
            });
        }
    };

export default validateResource;
