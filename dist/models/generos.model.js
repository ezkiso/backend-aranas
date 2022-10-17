"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genero = void 0;
const mongoose_1 = require("mongoose");
const generoSchema = new mongoose_1.Schema({
    nombreCientifico: {
        type: String,
        require: [true, 'El nombre es requerido']
    },
    descripcion: {
        type: String,
        require: [true, 'La descripcion es requerida']
    },
    nombreColoquial: {
        type: String
    },
    imagen: {
        type: String,
        require: [true, 'La imagen es necesaria']
    }
});
exports.Genero = (0, mongoose_1.model)('Genero', generoSchema);
