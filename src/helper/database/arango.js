const { Database, aql } = require("arangojs");
const dotenv = require("dotenv/config");

class ArangoDB{
    constructor(host,port,username,password,dbName){
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.dbName = dbName;
        this.connect();
    }

    connect(){
        try{
            this.db = new Database({
                url: `http://${this.host}:${this.port}`,
                databaseName: this.dbName,
                auth: { username: this.username, password: this.password },
            });
            console.log(`Arango DB connected successfully`)
        }catch(error){
            console.log(`Arango DB connection lost:  reconnecting ...`);
            setTimeout(this.connect(), 10000);
        }
    }

    async insert(collection,doc){
        const dbCollection = this.db.collection(collection);
        dbCollection.save(doc);
    }

    async update(collection,_key,data){}

    async delete(collection,_key,data){}

    async fetch(collection,_key){}

    async fetchManyByFilter(collection,filter){}

    async query(query){

    }
}

const arangoDB = new ArangoDB(
    process.env.ARANGO_HOST,
    process.env.ARANGO_PORT,
    process.env.ARANGO_USERNAME,
    process.env.ARANGO_PASSWORD,
    process.env.ARANGO_DB_NAME
);

module.exports = arangoDB;