const Koa = require("koa");
const cors = require("@koa/cors");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const config = require("./config");
const { routerBinder } = require("./api/index.bk");

const app = new Koa();
app.use(cors({origin:"*"}));
app.use(bodyparser());
app.use(logger());

routerBinder(app);




const PORT = config.PORT;
const server = app.listen(PORT,()=>{
    console.log(`app started at port ${PORT}`)
});

server.on("error",err=>{
    console(err);
});