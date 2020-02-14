const Controller = require('../../core/controller/ApiController');
const { Route, HttpGet, Middleware, filters } = require('../../../plugin/egg-decorator-router/lib');
const { ExceptionHandler } = require('../../../plugin/egg-controller-exception-handler/lib');

@Route('/api/admin/user')
class UserController extends Controller{

    @HttpGet('/:id')
    @ExceptionHandler()
    async getUserInfo(){
        const rule = {
           id: 'int'
        };
        this.validate(rule, this.ctx.params);
        const id = this.ctx.params.id;
        this.result.data = await this.service.admin.user.main.getUserInfo(id);
        return '查询成功'  //返回prompt，可选，一般不需要
    }
}


module.exports = UserController;
