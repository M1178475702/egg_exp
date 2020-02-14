const Service = require('../../../core/service/ApiService');

class UserDao extends Service {

    async findUserById(id){
        return this.model.User.findOne({
            where: {
                user_id: id
            },
            attributes:['admin','pwd']
        })
    }

    async rewFindUserById(id){
        const query = this.knex
            .select(`user_id`, `phone`)
            .from(subquery)
            .orderBy('user_id', 'DESC');
        const sql = query.toString();
        return this.model.query(sql, {type: this.model.QueryTypes.SELECT})
    }
}

module.exports = UserDao;
