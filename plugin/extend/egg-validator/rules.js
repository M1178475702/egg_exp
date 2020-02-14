module.exports = (app) =>{

    app.validator.addRule(
        'anyDate',
        (rule, val) => {
            if (new Date(val).toString() === 'Invalid Date')
                return val;
        },
        false,
        (val)=>{return new Date(val)}
    );

    app.validator.addRule('mobile', (rule, val) => {
        if(!/^1[3456789]\d{9}$/.test(val))
            return val;
    });
};
