const Service = require('../core/service/ApiService');
const {Transactional, PROPAGATION} = require('../../plugin/egg-sequelize-transactional');

class AService extends Service {

    @Transactional(PROPAGATION.MANDATORY)
    async test() {
        const ps = this.helper.makePromises();
        await ps
            .push(this.service.b.test())
            .push(this.service.b.test2())
            .execute();

        return 0;
    }
}

module.exports = AService;
