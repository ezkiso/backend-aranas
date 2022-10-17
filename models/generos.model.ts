import { Document, model, Schema } from "mongoose";

const generoSchema = new Schema({
    nombreCientifico:{
        type : String,
        require :[true,'El nombre es requerido']
    },
    descripcion:{
        type : String,
        require :[true,'La descripcion es requerida']
    },
    nombreColoquial:{
        type : String
    },
    imagen:{
        type : String,
        require :[true, 'La imagen es necesaria']
    }

});

    interface IGenero extends Document{
    nombreCientifico: string;
    descripcion : string;
    nombreColoquial: string;
    imagen: string;
    }

    export const Genero = model <IGenero>('Genero', generoSchema);
