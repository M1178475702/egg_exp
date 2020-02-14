/**
 * Created by Bakatora on 2019/4/13.
 */


const constant = {
    API_RESULT_MODEL: {
        "data": {},
        "msg": {
            "error": "",
            "prompt": ""
        },
        "retcode": 0,
    },

    API_RESULT_STATUS: {
        SUCCESS: 0,                              //成功
        E_INTERNAL_FAILURE: -1,                 //内部程序错误
        E_PERMISSION_DENIED: -50,               //权限不足
        E_TOKEN_FAILURE: -51,                 //token 失效
        E_ARGUMENT_ERROR: -200,                 //传参错误
        E_BUSINESS_ERROR: -300,                   //业务错误
    },

    GET_API_RESULT_MODEL: (code = 0) => {
        return {
            "data": {},
            "msg": {
                "error": "",
                "prompt": ""
            },
            "retcode": code
        };
    },
};


module.exports = constant;
