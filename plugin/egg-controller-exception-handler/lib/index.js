

function ExceptionHandler() {
    return function (controller, method, descriptor) {
        if(!descriptor){
            throw ReferenceError('The annotated must be the method!');
        }
        const oldFunc = descriptor.value;
        descriptor.value = async function () {
            try{
                const prompt = await oldFunc.apply(this, arguments);
                this.success(prompt);
            }
            catch (error) {
                this.handleError(error);
            }
        }
    }
}

module.exports = {ExceptionHandler};
