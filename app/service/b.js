const Service = require('../core/service/ApiService');
const {Transactional, PROPAGATION} = require('../../plugin/egg-sequelize-transactional');

class BService extends Service {

    @Transactional({propagation: PROPAGATION.CONCURRENT})
    async test() {
        console.log('testb');
        // await this.test2();
        return 1
    }

    @Transactional({propagation: PROPAGATION.CONCURRENT})
    async test2() {
        console.log('test2');
        return 2
    }
}

module.exports = BService;
