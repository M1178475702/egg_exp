class BusinessError extends Error{
    constructor(message){
        super(message);
        this.name = 'BusinessError';
    }
}

class InternalError extends Error{
    constructor(message){
        super(message);
        this.name = 'InternalError';
    }
}

class ValidationError extends Error{
    constructor(message){
        super(message);
        this.name = 'ValidationError';
    }
}

class PropertyRequiredError extends ValidationError{
    constructor(argument){
        super(`缺少参数 : ${argument}`);
        this.name = 'PropertyRequiredError';
    }
}

class InvalidError extends ValidationError {
    constructor(argument){
        super(`无效参数：${argument}`);
        this.name = 'InvalidError';
    }
}

class PermissionError extends Error{
    constructor(message){
        super(message);
        this.name = 'PermissionError';
    }
}

module.exports = {
    ArgumentError: ValidationError,
    PropertyRequiredError: PropertyRequiredError,
    InvalidError: InvalidError,
    PermissionError:PermissionError,
    InternalError: InternalError,
    BussinessError: BusinessError,
    SequelizeBaseError: null,
};
