const {Service} = require('egg');

class ApiService extends Service {
    constructor(self) {
        super(self);
    }

    //将事务挂在ctx上,供全局访问
    //维护一个quote，作为transaction在service中的方法中，被引用的次数，当且为1时，进行真正的commit与rollback
    //没有办法并发事务
    async getTransaction() {
        if (!this.ctx.transaction){
            this.ctx.transaction = {
                quote:1,
                t: await this.model.transaction()
            };
        }
        else
            ++this.ctx.transaction.quote;
        return this.ctx.transaction.t;
    }
    async rollback(){
        if(!this.ctx.transaction)
            throw new ReferenceError('transaction is undefined');
        if(this.ctx.transaction.quote <= 1)
            await this.ctx.transaction.t.rollback();
        else
            --this.ctx.transaction.quote;
    }
    async commit(){
        if(!this.ctx.transaction)
            throw new ReferenceError('transaction is undefined');
        if(this.ctx.transaction.quote <= 1)
            await this.ctx.transaction.t.commit();
        else
            --this.ctx.transaction.quote;
    }

    async getIdpTransacation(){
        return await this.model.transaction();
    }

    get helper(){
        return this.ctx.helper;
    }

    get model() {
        return this.app.model;
    }

    get knex(){
        return this.app.knex;
    }

    get constant() {
        return this.app.constant;
    }

    get error() {
        return this.app.error;
    }
}

module.exports = ApiService;
