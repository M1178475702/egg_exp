const Controller = require('../../core/controller/ApiController');
const { Route, HttpGet, HttpPost, Middleware, filters } = require('../../../plugin/egg-decorator-router');
const path = require('path');

@Route("/upload/image")
class UploadCtrl extends Controller{

    @HttpPost("/single")
    async test(){
        try{
            const rule = {
                'files': 'array'
            };
            this.validate(rule, this.ctx.request);
            const file = this.ctx.request.files[0];
            const extname = path.extname(file.filename);
            if(extname !== '.jpg' || extname !== '.jpng' || extname !== '.png'){
                throw this.error.InvalidError('文件类型必须为 jpg,jpng,png中的一种！');
            }
            this.result.data = await this.service.upload.image.singleImage(file);
            this.success();
        }
        catch (error) {
            this.handleError(error);
        }
    }
}

module.exports = UploadCtrl;
