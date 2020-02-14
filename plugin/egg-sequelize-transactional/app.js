
const defaultConfig = {

};

module.exports = async app => {
    const model = app.model;
    if(!model){
        throw ReferenceError('app.model is undefined!');
    }
};
