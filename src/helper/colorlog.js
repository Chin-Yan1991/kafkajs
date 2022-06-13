class ColorLog {
    static Red(...input){
        for(const data of input){
            console.log("\x1b[31m%s\x1b[0m",data);
        }
    }
    static Green(...input){
        for(const data of input){
            console.log("\x1b[32m%s\x1b[0m",data);
        }
    }
    static Blue(...input){
        for(const data of input){
            console.log("\x1b[34m%s\x1b[0m",data);
        }
    }
    static Yellow(...input){
        for(const data of input){
            console.log("\x1b[33m%s\x1b[0m",data);
        }
    }
    static Magenta(...input){
        for(const data of input){
            console.log("\x1b[35m%s\x1b[0m",data);
        }
    }
    static Cyan(...input){
        for(const data of input){
            console.log("\x1b[36m%s\x1b[0m",data);
        }
    }
}
module.exports = ColorLog;