import fs from "fs";
import path from "path";
import { Schema } from "joi";
import ColorLog from "../helper/colorlog";


//Route Loader
const directories = fs.readdirSync(__dirname).filter(dir => { return(dir!="index.js"&& dir!="routeMatrix.js")} );
for(const directory of directories){
    const files = fs.readdirSync(path.join(__dirname,`/${directory}`)).filter(file=>{
        return (file.split('.routes').length > 1) ;
    })
    if(files.length>0){
        const groupName = files[0].split('.routes')[0];
        let routeMatrix = require(`./${groupName}/${groupName}.routes`).default;
        if(routeMatrix?.Group){
            //ColorLog.Yellow({"Init Route Group" : routeMatrix.Group})
            routeMatrixes.push(routeMatrix);
        }
    }
}

module.exports = routeMatrixes;
