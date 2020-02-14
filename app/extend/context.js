const RESULT = Symbol('context#result');
module.exports = {

    get result(){
        if(!this[RESULT]){
            this[RESULT] = this.app.constant.GET_API_RESULT_MODEL();
        }
        return this[RESULT];
    },

    validate(rule, data) {
        const errors = this.app.validator.validate(rule, data);
        if (errors) {
            if (errors[0].code === 'invalid')
                throw new this.app.error.InvalidError(`${errors[0].field}`);
            else if (errors[0].code === 'missing_field')
                throw new this.app.error.PropertyRequiredError(`${errors[0].field}`)
        }
    },

    success(prompt){
        this.result.msg.prompt = prompt || '操作成功';
        this.result.retcode = this.app.constant.API_RESULT_STATUS.SUCCESS;
        this.body = this.result;
    },

    handleError(error) {
        if(error instanceof  this.app.error.BussinessError)
            this._businessError(error);
        else if (error instanceof this.app.error.ArgumentError)
            this._argumentError(error);
        else if (error instanceof this.app.error.PermissionError)
            this._permissionError(error);
        else if (error instanceof this.app.error.SequelizeBaseError)
            this._internalError(error);
        else if (error instanceof Error)
            this._internalError(error);
        else
            this._unknownError(new Error('Unknown error'), '未知错误');
    },

    _businessError(error){
        this.result.msg.prompt = error.message;
        this.result.retcode = this.app.constant.API_RESULT_STATUS.E_BUSINESS_ERROR;
        this.body = this.result;
    },

    _permissionError(error){
        this.result.msg.error = error.message;
        this.result.msg.prompt = '权限不足！';
        this.result.retcode = this.app.constant.API_RESULT_STATUS.E_PERMISSION_DENIED;
        this.body = this.result;
    },

    _argumentError(error) {
        this.logger.error(error);
        this.result.msg.prompt = '';
        this.result.msg.error = error.message;
        this.result.retcode = this.app.constant.API_RESULT_STATUS.E_ARGUMENT_ERROR;
        this.body = this.result;
    },

    _internalError(error) {
        this.logger.error(error);
        this.result.msg.error = error.message;
        this.result.msg.prompt = '系统错误，请稍后重试';
        this.result.retcode = this.app.constant.API_RESULT_STATUS.E_INTERNAL_FAILURE;
        this.body = this.result;
    },

    _unknownError(error){
        this.logger.error(error);
        this.result.msg.error = error.message;
        this.result.msg.prompt = '系统错误，请稍后重试';
        this.result.retcode = this.app.constant.API_RESULT_STATUS.E_INTERNAL_FAILURE;
        this.body = this.result;
    },



};
