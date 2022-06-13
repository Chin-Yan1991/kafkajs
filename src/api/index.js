import config from "../config";
import Router from "koa-router";
import Koa from "koa";
import mount from "koa-mount";
import res from "../helper/response";
import routeMatrix from "./routeMatrix";
import ColorLog from "../helper/colorlog";


const validateMiddleware = (ctx, next) => {
    const schema = ctx.route.schema;
    const controller = ctx.route.controller;
    const method = ctx.route.method.toLowerCase();
    const payload = (method=='get')? ctx.request.query : ctx.request.body;
    try{
        //Token validation

        //Permission validation

        //Payload Validation
        const validation = schema.validate(payload);
        if(validation.error) throw res.badRequest("Validation Error",validation.error);
        controller(ctx,next);
    }catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
}



const routerBinder = (app) => {

    for(const routematrix of routeMatrix ){
        const router = new Router({prefix: `/${config.VERSION}${routematrix.Group}`});
        
        routematrix.Routes.map(route=>{
            
            router.use(async(ctx,next)=>{
                ctx.route = route;
                next();
            });

            router.use(validateMiddleware);
            const httpMethod = route.method;
            ColorLog.Cyan({httpMethod, path:`/${config.API_VERSION}${routematrix.Group}${route.path}`});


            switch(httpMethod){
                case "GET" :
                    router.get(route.path,route.controller);
                case "POST" :
                    router.post(route.path,route.controller);
                case "PUT" :
                    router.put(route.path,route.controller);
                case "PATCH":
                    router.patch(route.path,route.controller);
                case "DELETE":
                    router.delete(route.path,route.controller);
                case "ALL":
                    router.all(route.path,route.controller);
            }
        });
    
        app.use(router.routes());
    }
}

module.exports = routerBinder; 
