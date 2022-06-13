const Router = require("koa-router");
const { listTopicHandler, publishHandler, createTopicHandler } = require("./kafka.controller")

const router = new Router({prefix:"/kafka"});
router.get("/topicList",listTopicHandler);
router.post("/publish",publishHandler);
router.post("/createTopic",createTopicHandler);

module.exports = router;