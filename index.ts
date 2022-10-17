import bodyParser from "body-parser";
import mongoose from "mongoose";
import Server from "./classes/server";
import defaultRoutes from "./routes/default.routes";
import generoRoutes from "./routes/generos.routes";

const server = new Server();

server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({extended:true}));

server.app.use('/', defaultRoutes);
server.app.use('/generos', generoRoutes)

mongoose.connect('mongodb://localhost:27017/arañasDb',(error)=>{
    if(error){
        throw error;
    }
    console.log('BD funcionando');
})

server.Start(()=>{
    console.log(`Servidor corriendo en puerto ${server.port}`)
})