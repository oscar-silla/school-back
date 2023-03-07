import express, {NextFunction, Request, Response} from "express";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (err) {
        next(err);
    }
})