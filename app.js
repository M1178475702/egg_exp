require('babel-register')({plugins: ['transform-decorators-legacy']});
const constant = require('./app/common/constant/common-constant');
const error = require('./app/core/error/errors.js');
const ValidatorExtend = require('./plugin/extend/egg-validator/rules');
class AppBootHook {
    constructor(app) {
        this.app = app;
    }

    configWillLoad() {
        this.app.constant = constant;
        this.app.error = error;
    }

    async willReady() {
        //设置sequelize错误
        this.app.error.SequelizeBaseError = this.app.model.Error;
        ValidatorExtend(this.app);

    }
}

module.exports = AppBootHook;
