import express, { Request, Response, NextFunction } from "express";
import { SectionBody } from "../../../../../external-libraries/openapi";
import { Section } from "../../../../application/domain/section";
import { CreateSectionUseCase } from "../../../../application/usecases/section/create-section.usecase";
import { SectionControllerMapper } from "../mappers/section.controller.mapper";
const router = express.Router();

const createSectionUseCase = new CreateSectionUseCase();
const sectionMapper = new SectionControllerMapper();

router.post(
  "/",
  async (
    req: Request<SectionBody>,
    res: Response<void>,
    next: NextFunction
  ) => {
    try {
      const section: Section = sectionMapper.toSection(req.body);
      await createSectionUseCase.createSection(section);
      res.status(201).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
