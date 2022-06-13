const fs = require("fs");
const path = require("path");

exports.routerBinder = async app => {
    const apiDir = fs.readdirSync(__dirname) 
    for(const dir of apiDir){
        if(dir.search(".js")!==-1) continue; 
        const files = fs.readdirSync(path.join(__dirname,`/${dir}`));
        for(const file of files){
            if(file.search(".router.js")!==-1){
                const dirname = file.split(".router.js")[0];
                const router = require(`./${dirname}/${file}`);
                app.use(router.routes())
                .use(router.allowedMethods());
            } 
        }
    }
}

// const openRouter = require("./open/open.router");
// const topicRouter = require("./topic/topic.router");

// exports.routerBinder = async app => {
//     app.use(openRouter.routes());
//     app.use(topicRouter.routes());
// }


