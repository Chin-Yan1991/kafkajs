const Router = require("koa-router");
const { check } = require("./open.controller");

const router = new Router({prefix:"/"});
router.get("/",check);

module.exports = router;