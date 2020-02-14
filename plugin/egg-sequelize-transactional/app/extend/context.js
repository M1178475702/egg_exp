
const TRANSACTION = Symbol('context#seq_transaction');
module.exports = {

    get sequelize(){
        return this.app.model;
    },

    get Tx(){
        if(!this[TRANSACTION]){
            this[TRANSACTION] = {
                count: 0,
                get exist(){
                    return this.count > 0;
                },
                new(){
                    this.count++;
                },
                done(){
                    this.count--;
                }
            }
        }
        return this[TRANSACTION];
    },

};
