import { request, Request, Response, Router } from "express";
import { Genero } from "../models/generos.model";

const generoRoutes = Router();

generoRoutes.get('/',async (req:Request,res:Response)=>{

    const generos = await Genero.find();

    return res.json({
        ok: true,
        generos
    })
});

generoRoutes.get('/paging',async (req:Request,res:Response)=>{

    let perPage = 5;
    let page = Number(req.query.page);
    let skip = page-1;
    skip = skip*perPage;
    const generos = await Genero.find().skip(skip).limit(perPage);

    return res.json({
        ok: true,
        msj:"Ok paging"
    })
});


generoRoutes.post('/',(req:Request,res:Response)=>{

    const body = req.body;
    
    const generos = {
        nombreCientifico: body.nombreCientifico,
        descripcion: body.descripcion,
        nombreColoquial: body.nombreColoquial,
        imagen: body.imagen

    }
    Genero.create(generos).then(generosDb=>{
        return res.json({
            ok: true,
            generosDb
        })
    }).catch(err=>{
        return res.json({
            ok: false,
            err
        })
    })
});

generoRoutes.put('/:id', (req:Request, res:Response)=>{

    const generosId = request.params.id;
    const body = req.body;

    const generos = {
        nombreCientifico: body.nombreCientifico,
        descripcion: body.descripcion,
        nombreColoquial: body.nombreColoquial,
        imagen: body.imagen

    }

    Genero.findByIdAndUpdate(generosId, generos).then(generosDb=>{

        return res.json({
            ok: true,
            generosDb
        })
    })

});

generoRoutes.delete('/',async(req : Request, res: Response)=>{

    const generosId = req.query.id;

    if(!generosId){
        
        return res.json({
            ok:false,
            msj:"El registro no existe"
        })
    }
    await Genero.findByIdAndDelete(generosId);

    const generosDb = await Genero.findById(generosId);

    return res.json({
        ok:true,
        msj:"Delete ok"
    })
})

export default generoRoutes;