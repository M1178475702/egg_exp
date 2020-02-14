const PROPAGATION = {
    REQUIRED: 100,  //如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。
    SUPPORTS: 101,  //如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。
    MANDATORY: 102,  //如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。
    CONCURRENT: 103  //如果当前存在事务，则创建一个新事务；如果当前没有事务，则创建一个新事务。
};
const defaultOpt = {
    propagation: PROPAGATION.REQUIRED,
};

class TransactionError extends Error{
    constructor(message) {
        super(message);
        this.name = 'TransactionError';
    }
}


function Transactional(opt) {
    return function (service, name, descriptor) {
        if(!descriptor){
            throw ReferenceError('The annotated must be the method!');
        }
        if(typeof opt === 'number'){
            opt = {propagation: opt}
        }
        const oldFunc = descriptor.value;
        descriptor.value = async function () {
            const self = this;
            const args = arguments;
            const ctx = this.ctx;
            opt = Object.assign({}, defaultOpt, opt);
            switch (opt.propagation) {
                case PROPAGATION.REQUIRED:
                    if (!ctx.Tx.exist) {
                        ctx.Tx.new();
                        return ctx.sequelize.transaction(opt, async function () {
                            const result = await oldFunc.apply(self, args);
                            ctx.Tx.done();
                            return result;
                        });
                    } else {
                        return oldFunc.apply(self, args);
                    }
                case PROPAGATION.SUPPORTS:
                    return oldFunc.apply(self, args);
                case PROPAGATION.MANDATORY:
                    if(!ctx.Tx.exist){
                        throw new TransactionError('propagation is mandatory but there is no exist transaction!');
                    }
                    return oldFunc.apply(self, args);
                case PROPAGATION.CONCURRENT:
                    //不计数
                    return ctx.sequelize.transaction(opt, async function () {
                        return oldFunc.apply(self, args);
                    });
            }

        };

    }
}

module.exports = {
    Transactional,
    TransactionError,
    PROPAGATION
};
