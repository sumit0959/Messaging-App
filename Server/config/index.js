// configuration of express application
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";

const configureExpressApp = (app)=>{
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended:true}));
    // parse application/json
    app.use(bodyParser.json())
    // compression of data
    app.use(compression(9))
    // CORS-Cross-Origin Resource Sharing (CORS) s a protocol that enables scripts running on a browser client to interact with resources from a different origin
    app.use(cors())
};

export default configureExpressApp