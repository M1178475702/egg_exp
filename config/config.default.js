'use strict';
const path = require('path');
const Sequelize = require('sequelize');
const cls = require('continuation-local-storage');
const os = require('os');

module.exports = appInfo => {
    const config = {};

    config.multipart = {
        mode: 'file',
        tmpdir: path.join(os.tmpdir(), 'egg-multipart-tmp', appInfo.name),
        cleanSchedule: {
            // run tmpdir clean job on every day 04:30 am
            // cron style see https://github.com/eggjs/egg-schedule#cron-style-scheduling
            cron: '0 30 4 * * *',
        },
        whitelist: [
            '.jpg', '.jpeg',
            '.png',
            '.mp3',   //假设音频格式是mp3
        ],
    };

    config.middleware = ['cors'];

    config.cluster = {
        listen: {
            port: 8880,
        }
    };
    config.decoratorRouter = {};

    config.session = {
        key: 'sid',
        maxAge: 1000 * 3600 * 24 , // 1 天
        encrypt: true,
        renew: true
    };

    const namespace = cls.createNamespace('my-very-own-namespace');
    Sequelize.useCLS(namespace);
    config.namespace = namespace;
    const dbConfig = {
        dialect: 'mysql',
        database: 'tbs_vote',
        username: 'tbs_vote',
        password: 'tbs_vote',
        host: '47.98.146.46',
        port: '33061',
        pool: {
            max: 2, //must be greater than 1
            idle: 300000,
            acquire: 600000
        },
        define: {
            timestamps: false
        },
        Sequelize: Sequelize,
        timezone: '+08:00',
    };

    config.crypto_key = 'ea15987dfe12eed6';


    config.bodyParser = {
        jsonLimit: '50mb'
    };

    exports.logview = {};

    config.validate = {
        convert: true,
        validateRoot: false,
    };

    config.keys = appInfo.name + '_1526343653947_0101';

    config.logger = {
        appLogName: `${appInfo.name}-web.log`,
        coreLogName: 'egg-web.log',
        agentLogName: 'egg-agent.log',
        errorLogName: 'common-error.log',
    };

    config.sequelize = dbConfig;

    config.knex = {
        // database configuration
        client: {
            // database dialect
            dialect: dbConfig.dialect,
            connection: {
                // host
                host: dbConfig.host,
                // port
                port: dbConfig.port,
                // username
                user: dbConfig.username,
                // password
                password: dbConfig.password,
                // database
                database: dbConfig.database,
                requestTimeout: 600000,
            },
            // connection pool
            pool: {min: 0, max: 1},
            // acquire connection timeout, millisecond
            acquireConnectionTimeout: 600000,
        },
        // load into app, default is open
        app: true,
        // load into agent, default is close
        agent: false,
    };

    config.appBaseDir = path.join(appInfo.baseDir, 'app');

    config.development = {
        overrideDefault: true,
        watchDirs: [
            'app/controller',
            'app/service',
            'app/middleware',
            'app/model',
            'app/router',
        ]
    };

    config.security = {
        csrf: false,
    };

    return config;
};
