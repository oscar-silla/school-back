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
const delete_section_usecase_1 = require("../../../../application/usecases/section/delete-section.usecase");
const get_section_usecase_1 = require("../../../../application/usecases/section/get-section.usecase");
const get_sections_usecase_1 = require("../../../../application/usecases/section/get-sections.usecase");
const modify_section_usecase_1 = require("../../../../application/usecases/section/modify-section.usecase");
const section_controller_mapper_1 = require("../mappers/section.controller.mapper");
const router = express_1.default.Router();
const { NO_CONTENT, OK, CREATED } = http_code_1.HttpCode;
const sectionMapper = new section_controller_mapper_1.SectionControllerMapper();
const getSectionsUseCase = new get_sections_usecase_1.GetSectionsUseCase();
const createSectionUseCase = new create_section_usecase_1.CreateSectionUseCase();
const getSectionUseCase = new get_section_usecase_1.GetSectionUseCase();
const modifySectionUsecase = new modify_section_usecase_1.ModifySectionUseCase();
const deleteSectionUseCase = new delete_section_usecase_1.DeleteSectionUseCase();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const section = sectionMapper.toSection(req.body);
        yield createSectionUseCase.createSection(section);
        res.status(CREATED).send();
    }
    catch (err) {
        next(err);
    }
}));
router.get("/", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sections = yield getSectionsUseCase.getSections();
        const sectionsResponse = sectionMapper.toSectionsResponse(sections);
        res.status(OK).json(sectionsResponse);
    }
    catch (err) {
        next(err);
    }
}));
router.get("/:ref", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const section = yield getSectionUseCase.getSection((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.ref);
        const sectionResponse = sectionMapper.toSectionResponse(section);
        res.status(OK).json(sectionResponse);
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/:ref", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const section = sectionMapper.toSection(req.body);
        yield modifySectionUsecase.modifySection((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.ref, section);
        res.status(OK).send();
    }
    catch (err) {
        next(err);
    }
}));
router.delete("/:ref", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        yield deleteSectionUseCase.deleteSection((_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.ref);
        res.status(NO_CONTENT).send();
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
