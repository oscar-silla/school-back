"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_code_1 = require("../../../../application/domain/http-code");
const create_section_usecase_1 = require("../../../../application/usecases/section/create-section.usecase");
const get_sections_usecase_1 = require("../../../../application/usecases/section/get-sections.usecase");
const section_controller_mapper_1 = require("../mappers/section.controller.mapper");
const router = express_1.default.Router();
const sectionMapper = new section_controller_mapper_1.SectionControllerMapper();
const getSectionsUseCase = new get_sections_usecase_1.GetSectionsUseCase();
const createSectionUseCase = new create_section_usecase_1.CreateSectionUseCase();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const section = sectionMapper.toSection(req.body);
        yield createSectionUseCase.createSection(section);
        res.status(201).send();
    }
    catch (err) {
        next(err);
    }
}));
router.get("/", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sections = yield getSectionsUseCase.getSections();
        const sectionsResponse = sectionMapper.toSectionsResponse(sections);
        res.status(http_code_1.HttpCode.OK).json(sectionsResponse);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
