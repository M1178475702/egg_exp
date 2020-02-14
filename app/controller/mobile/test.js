const Controller = require('../../core/controller/ApiController');
const { Route, HttpGet, Middleware, filters } = require('../../../plugin/egg-decorator-router');


@Route("/test")
class TestCtrl extends Controller{

    @HttpGet("/test")
    async test(){
        try{
            console.log(await this.service.a.test());
            this.success();
        }
        catch (error) {
           this.handleError(error);
        }
    }
}

module.exports = TestCtrl;
