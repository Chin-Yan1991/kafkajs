import path from 'path';
import serve from 'koa-static';
import { koaSwagger } from 'koa2-swagger-ui';
import generateSwaggerDoc from"./doc/generate";
import config from '../../config';
import CONSTANTS from '../constant';


const swaggerUI = (app) => {
    if(config.API_ENVIRONMENT == CONSTANTS.ENVIRONMENT.DEVELOPMENT){
        const url = path.resolve(__dirname, './doc/swaggerDoc.json');
        app.use(serve("/"))
        generateSwaggerDoc();
        app.use(
            koaSwagger({ 
                routePrefix: CONSTANTS.SWAGGER.API_DOC_URL,
                exposeSpec: false, // expose spec file
                hideTopbar: true,
                title: 'swagger API Doc',
                swaggerOptions: { url } 
            })
        );
    }
};

module.exports = swaggerUI;
