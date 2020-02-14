const error = require('../core/error/errors');
module.exports = ()=>{
    return async(ctx,next)=>{
        const body = ctx.request.body;
        if(!body.args)
            throw new error.InvalidError('无效入参格式');
        await next();
    }
};
