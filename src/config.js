const Joi = require("joi");
const dotenv = require("dotenv/config");
const ColorLog = require("./helper/colorlog");

const validate = (schema, data) =>{
    try{
        const result = schema.validate(data);
        if(result.error)throw(result.error);
        return result.value;
    }catch(error){
        ColorLog.Red("config validation error",error);
    }
}

const configSchema = Joi.object().keys({
    PORT: Joi.number().required().default("3000"),
    API_VERSION: Joi.string().default("v1").required(),
    API_ENVIRONMENT: Joi.string().valid("test","development","production").required(),
    // REDIS_HOST: Joi.string().required(),
    // REDIS_PORT: Joi.string().required(),
    // REDIS_PASSWORD: Joi.string().required(),
    // REDIS_USERNAME: Joi.string().required(),
    // REDIS_DBNAME: Joi.string().required(),
    API_PROTOCOL: Joi.string().required(),
    API_HOST: Joi.string().required(),
    KAFKA_HOST: Joi.string().required(),
    KAFKA_PORT: Joi.number().required(),
    ARANGO_HOST: Joi.string().required(),
    ARANGO_PORT: Joi.number().required(),
    ARANGO_USERNAME: Joi.string().required(),
    ARANGO_PASSWORD: Joi.string().required(),
    ARANGO_DB_NAME: Joi.string().required(),
});

const configData = {
    PORT: process.env.PORT,
    API_VERSION: process.env.API_VERSION,
    API_ENVIRONMENT: process.env.API_ENVIRONMENT,
    // REDIS_HOST: process.env.REDIS_HOST,
    // REDIS_PORT: process.env.REDIS_PORT,
    // REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    // REDIS_USERNAME: process.env.REDIS_USERNAME,
    // REDIS_DBNAME: process.env.REDIS_DBNAME,
    API_PROTOCOL:process.env.API_PROTOCOL,
    API_HOST:process.env.API_HOST,
    KAFKA_HOST: process.env.KAFKA_HOST,
    KAFKA_PORT: process.env.KAFKA_PORT,
    ARANGO_HOST: process.env.ARANGO_HOST,
    ARANGO_PORT: process.env.ARANGO_PORT,
    ARANGO_USERNAME: process.env.ARANGO_USERNAME,
    ARANGO_PASSWORD: process.env.ARANGO_PASSWORD,
    ARANGO_DB_NAME: process.env.ARANGO_DB_NAME,


}

const config = validate(configSchema,configData)

module.exports = config;

