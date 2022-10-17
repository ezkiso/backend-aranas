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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generos_model_1 = require("../models/generos.model");
const generoRoutes = (0, express_1.Router)();
generoRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const generos = yield generos_model_1.Genero.find();
    return res.json({
        ok: true,
        generos
    });
}));
generoRoutes.get('/paging', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let perPage = 5;
    let page = Number(req.query.page);
    let skip = page - 1;
    skip = skip * perPage;
    const generos = yield generos_model_1.Genero.find().skip(skip).limit(perPage);
    return res.json({
        ok: true,
        msj: "Ok paging"
    });
}));
generoRoutes.post('/', (req, res) => {
    const body = req.body;
    const generos = {
        nombreCientifico: body.nombreCientifico,
        descripcion: body.descripcion,
        nombreColoquial: body.nombreColoquial,
        imagen: body.imagen
    };
    generos_model_1.Genero.create(generos).then(generosDb => {
        return res.json({
            ok: true,
            generosDb
        });
    }).catch(err => {
        return res.json({
            ok: false,
            err
        });
    });
});
generoRoutes.put('/:id', (req, res) => {
    const generosId = express_1.request.params.id;
    const body = req.body;
    const generos = {
        nombreCientifico: body.nombreCientifico,
        descripcion: body.descripcion,
        nombreColoquial: body.nombreColoquial,
        imagen: body.imagen
    };
    generos_model_1.Genero.findByIdAndUpdate(generosId, generos).then(generosDb => {
        return res.json({
            ok: true,
            generosDb
        });
    });
});
generoRoutes.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const generosId = req.query.id;
    if (!generosId) {
        return res.json({
            ok: false,
            msj: "El registro no existe"
        });
    }
    yield generos_model_1.Genero.findByIdAndDelete(generosId);
    const generosDb = yield generos_model_1.Genero.findById(generosId);
    return res.json({
        ok: true,
        msj: "Delete ok"
    });
}));
exports.default = generoRoutes;
