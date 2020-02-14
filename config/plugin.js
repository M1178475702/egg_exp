'use strict';
const path = require('path');
// had enabled by egg
exports.static = true;

exports.cluster = {
    enable: true,
    package: 'egg-cluster'
};

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize',
};

exports.validate = {
    enable: true,
    package: 'egg-validate'
};

exports.session = true;

exports.logview = {
    package: 'egg-logview',
};


exports.knex = {
    enable: true,
    package: 'egg-knex',
};

exports.decoratorRouter = {
    enable: true,
    path: path.join(__dirname, '../plugin/egg-decorator-router')
};

exports.sequelizeTransactional = {
    enable: true,
    path: path.join(__dirname, '../plugin/egg-sequelize-transactional')
};

exports.controllerExceptionHandler = {
    enable: true,
    path: path.join(__dirname, '../plugin/egg-controller-exception-handler')
};

// config/config.default.js
exports.multipart = true;
