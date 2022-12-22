import express, { Request, Response, NextFunction } from "express";
import { SectionBody } from "../../../../../external-libraries/openapi/models/SectionBody";
import { SectionResponse } from "../../../../../external-libraries/openapi/models/SectionResponse";
import { HttpCode } from "../../../../application/domain/http-code";

import { Section } from "../../../../application/domain/section";
import { CreateSectionUseCase } from "../../../../application/usecases/section/create-section.usecase";
import { GetSectionUseCase } from "../../../../application/usecases/section/get-section.usecase";
import { GetSectionsUseCase } from "../../../../application/usecases/section/get-sections.usecase";
import { ModifySectionUseCase } from "../../../../application/usecases/section/modify-section.usecase";
import { SectionControllerMapper } from "../mappers/section.controller.mapper";
const router = express.Router();

const sectionMapper = new SectionControllerMapper();

const getSectionsUseCase = new GetSectionsUseCase();
const createSectionUseCase = new CreateSectionUseCase();
const getSectionUseCase = new GetSectionUseCase();
const modifySectionUsecase = new ModifySectionUseCase();

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

router.get(
  "/",
  async (
    _req: Request,
    res: Response<SectionResponse[]>,
    next: NextFunction
  ) => {
    try {
      const sections = await getSectionsUseCase.getSections();
      const sectionsResponse = sectionMapper.toSectionsResponse(sections);
      res.status(HttpCode.OK).json(sectionsResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:ref",
  async (req: Request, res: Response<SectionResponse>, next: NextFunction) => {
    try {
      const section = await getSectionUseCase.getSection(req?.params?.ref);
      const sectionResponse = sectionMapper.toSectionResponse(section);
      res.status(200).json(sectionResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:ref",
  async (req: Request, res: Response<any>, next: NextFunction) => {
    try {
      const section = sectionMapper.toSection(req.body);
      await modifySectionUsecase.modifySection(req?.params?.ref, section);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
