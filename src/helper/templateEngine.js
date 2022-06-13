
const mount =require("koa-mount");
const serve =require("koa-static");
const render = require("koa-ejs");
const path = require("path");
const fs = require("fs");
const colorlog = require("./colorlog");

const templateEngine = (app) => {
    const viewPath = path.resolve(__dirname,"../../pages")

    render(app,{
        root: viewPath,
        layout: false,
        viewExt: 'ejs',
        cache: false,
        debug: false
    });

    app.use(mount("/template",serve(viewPath)));
    const ejsTemplates = fs.readdirSync(viewPath).filter(template=>{ 
        return template!="component" 
    });
    for(const ejsTemplate of ejsTemplates){
        let namespace = ejsTemplate.split(".ejs")[0]
        ColorLog.Green({"Page":namespace});
        app.use(mount(`/view/${namespace}`,async(ctx,next)=>{ 
            return ctx.render(namespace,{
                title:namespace
            });
        }));
        
    }

}

module.exports = templateEngine;
