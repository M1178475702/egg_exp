const Service = require('../../core/service/ApiService');
const path = require('path');
const fs = require('fs');

class UploadService extends Service{

    async singleImage(file){
        const fileMeta = this.generateFileMeta(file, 'image');
        await this.helper.writeFileByStream(fileMeta.filepath, fs.createReadStream(file.filepath), true);
        return {
            url: this.app.config.upload.host + fileMeta.relFilepath
        }
    }

    generateFileMeta(file, type){
        const now = new Date(this.ctx.starttime);
        const filename = this.helper.uuid() + path.extname(file.filename);
        const relFilepath = `/${type}/${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}/${filename}`;
        const filepath = this.app.config.upload.dir + relFilepath;
        return {
            relFilepath: relFilepath,
            filepath: filepath
        }

    }
}

module.exports = UploadService;
