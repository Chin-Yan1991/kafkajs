const kafka = require("../../helper/kafka");

exports.subscribeHandler = async(data) => {
    console.log(data);
}

exports.publishHandler = async(ctx,next) => {
    try{
        const payload = ctx.request.query;
        const keys = Object.keys(payload);
        const values = Object.values(payload)

        const message = [];
        for(let i = 0; i<keys.length; i++){ 
            message.push({key:keys[i],value:values[i]}); 
        }
        kafka.publish("test_topic",message);
        ctx.body = {status:200, res: "message sent", data:message}
        ctx.status = 200;
    }catch(error){
        console.log(error);
    }
}

exports.listTopicHandler = async(ctx,next) => {
    try{
        const topicList = await kafka.listAllTopic()
        ctx.body = { status:200, res: "list all topics", data:topicList }
        ctx.status = 200;
    }catch(error){
        console.log(error);
    }
}

exports.createTopicHandler = async(ctx,next) => {
    try{
        const payload = ctx.request.body;
        const { userID } = payload;

        kafka.createTopic(userID);
    }catch(error){
        console.log(error);
    }
}