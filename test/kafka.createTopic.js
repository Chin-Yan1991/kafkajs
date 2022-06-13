const superagent = require("superagent");

url = `https://127.0.0.1:8080/kafka/createTopic`;


const payload = {}
const response = new Promise(resolve=>{
    superagent.post(url)
    .set("Content-Type", "application/json")
    .send(payload)
    .end((err,res)=>{
        if(err) resolve(err);
        if(res) resolve(res);
    })
});

response.then(
    err => { console.log(err)},
    res => { console.log(res) }
)