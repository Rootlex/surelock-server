import { Application, Request, Response } from "express";
import handleError from "./middlewares/error-handler";
import productsRouter from "./resources/Products/products.routes";

function routes(app: Application) {
    app.get("/", (req: Request, res: Response) => {
        res.send("Hello, world!");
    });
    // Add more routes here

    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.use("/api/products", productsRouter);

    app.use(handleError);
}

export default routes;
