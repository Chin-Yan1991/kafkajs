exports.check = (ctx,next) => {
    try{
        ctx.body = {status:200, res:"Healthy"}
        ctx.status = 200;
    }catch(error){
        console.log(error)
    }
}