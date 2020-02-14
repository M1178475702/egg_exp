const Service = require('../../../core/service/ApiService');

class UserService extends Service{

    async getUserInfo(id){
        const dao = this.service.admin.user.dao;
        return dao.findUserById(id);
    }
}

module.exports = UserService;
