import express  from "express";
import productsRoute from './route/products.routes.js';
import indexRoutes from './route/index.routes.js';
import ventasRoute from './route/ventas.routes.js';
import cors from 'cors';

const app = express();
import {PORT} from './config.js';

app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static("public"));
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(indexRoutes);
app.use(productsRoute);
app.use(ventasRoute);

app.use((req, res, next)=>{
    res.status(404).json({
        message: 'endpoint not found'
    })
})


app.listen(PORT, () =>{
    console.log("Server running in port " + PORT)
});
