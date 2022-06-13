const { Kafka } = require("kafkajs");
const dotenv = require("dotenv/config");

class ApacheKafka{
    constructor(host,port){
        this.kafka = new Kafka({ brokers: [`${host}:${port}`] });
    }

    async createTopic(topic){
        try{
            const admin = this.kafka.admin();
            await admin.connect();
            await admin.createTopics({
                validateOnly: false,
                waitForLeaders: true,
                timeout: 10000,
                topics: [{topic}]
            });
            await admin.disconnect();
            return {message: "topic created", data:topic}
        }catch(error){
            console.log(error);
        }

    }

    async listAllTopic(){
        try{
            const admin = this.kafka.admin();
            await admin.connect();
            const topicList = await admin.listTopics();
            await admin.disconnect();
            return topicList;
        }catch(error){
            console.log(error);
        }
    }

    async subscribe(topic,groupId,callback){
        try{
            const consumer = this.kafka.consumer({ groupId });
            await consumer.connect();
        
            await consumer.subscribe({ topic, fromBeginning: true });
        
            let startTime = Date.now();
        
            await consumer.run({ 
                eachMessage: async (data) => {
                    console.log(Date.now() - startTime, data.message.value.toString('utf8'));
                    callback(data);
                }
            });
        }catch(error){
            console.log(error);
        }
    }

    async publish(topic,messages) {
        try{
            const producer = this.kafka.producer();
            await producer.connect();
        
            await new Promise(resolve => setTimeout(resolve, 1000));
        
            await producer.send({topic, messages });
            await producer.disconnect();
        }catch(error){
            console.log(error);
        }
    }
}

const kafka = new ApacheKafka(process.env.KAFKA_HOST,process.env.KAFKA_PORT)
module.exports = kafka;



