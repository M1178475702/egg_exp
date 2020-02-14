const crypto = require('crypto');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const moment = require('moment');
const util = require('util');
const stringWidth = require('string-width');

exports.makePromises = require('./promises').getPromises;
exports.stringWidth = stringWidth;

/**
 * @author Bakatora
 * @description 产生指定长度的随机16进制字符串
 * @param size  指定字符串长度
 * @returns Promise<any> random
 */

exports.generateString = (size) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(size / 2, (err, buf) => {
            if (err) {
                reject(err);
            } else {
                resolve(buf.toString('hex'));
            }
        })
    })
};

/**
 * @author Bakatora
 * @description md5 algorithm
 * @param data
 * @returns {string}
 */
exports.md5 = (data) => {
    return crypto.createHash('md5').update(data).digest('hex');
};

/**
 * @author Bakatora
 * @description sha1 algorithm
 * @param data
 * @returns {string}
 */
exports.sha1 = (data) => {
    return crypto.createHash('sha1').update(data).digest('hex');
};

/**
 * @author Bakatora
 * @description hash
 * @param algorithm 算法名称
 * @param data 需要被hash的数据
 * @param encoding 结果编码，默认为hex
 * @returns {string}
 */
exports.hash = (algorithm, data, encoding) => {
    encoding = encoding || 'hex';
    return crypto.createHash(algorithm).update(data).digest(encoding);
};


exports.farawayDays = farawayDays;

exports.weekday = weekday;

exports.moment = moment;

// exports.uuid = (name) => {
//     return uv4(name || 'xuedao.com').replace(/-/g, '');
// };

/**
 * @author Bakatora
 * @description 异步函数版本的写文件，提供自动创建功能，使用流
 * @param filepath 文件绝对路径
 * @param readStream 读取流
 * @param isMakeDir 是否自动创建目录，默认为false
 * @param options 写文件时的options，同标准库
 * @returns {void}
 */
exports.writeFileByStream = async (filepath, readStream, isMakeDir, options) => {
    try {
        await _writeFileByStream(filepath, readStream, options)
    }
    catch (error) {
        if (error.code === 'ENOENT' && isMakeDir === true) {
            await fsPromises.mkdir(path.dirname(filepath), {recursive: true});
            await _writeFileByStream(filepath, readStream, options)
        } else
            throw error;
    }
};

exports.writeFile = writeFile;

exports.unlink = unlink;

/**
 * @author Bakatora
 * @description 是否是object
 * @param obj 要检测的对象
 * @param allowEmpty 是否允许对象为空
 * @returns {void}
 */
exports.isObject = (obj, allowEmpty) => {
    if (obj === null)
        return false;
    if (typeof obj === 'object') {
        if (allowEmpty)
            return true;
        else {
            const keys = Object.keys(obj);
            return keys.length !== 0;
        }
    }
};

exports.util = util;

/**
 * @author Bakatora
 * @description 返回日期的 YMDhms格式化
 * @param date Date对象
 * @return {string}
 */
exports.YMDhms = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

/**
 * @author Bakatora
 * @description 返回距 {cur} 所指定的日期偏离的时间
 * @param distance  距离今天的天数  默认0，正数为未来
 * @param hour      所求当天几点    默认0
 * @param minute    几分            默认0
 * @param second    几秒            默认0
 * @param cur       初始日期，默认为 new Date()
 * @param useUTC
 * @returns {Date}
 */

function farawayDays(distance = 0, hour = 0, minute = 0, second = 0, cur = new Date(), useUTC = false) {
    let time = new Date(cur.getTime() + distance * 86400000);
    time = new Date(`${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${hour}: ${minute}:${second}`);
    if (useUTC)
        time.setTime(time.getTime() + 28800000);
    return time;
}

/**
 * @author Bakatora
 * @description 返回与现在相隔{weeks}星期的星期{day}的{h}:{m}:{s}的日期
 * @param weeks 距离今天的天数，默认0，正数为未来
 * @param day 所求当天几点，默认0
 * @param h 所求当天几点，默认0
 * @param m 几分，默认0
 * @param s 几秒，默认0
 * @returns {Date}
 */
function weekday(weeks, day, h, m, s) {
    let nowDay = new Date().getDay() || 7;
    let distance = weeks * 7 + (day - nowDay);
    return farawayDays(distance, h, m, s);
}

/**
 * @author Bakatora
 * @description 异步函数版本的写文件，提供自动创建功能，没有使用流
 * @param filepath 文件绝对路径
 * @param data 要写入的数据
 * @param isMakeDir 是否自动创建目录，默认为false
 * @param options 写文件时的options，同标准库
 * @returns {Promise<void>}
 */
async function writeFile(filepath, data, isMakeDir, options) {
    try {
        await fsPromises.writeFile(filepath, data, options);
    }
    catch (error) {
        if (error.code === 'ENOENT' && isMakeDir === true) {
            await fsPromises.mkdir(path.dirname(filepath), {recursive: true});
            await fsPromises.writeFile(filepath, data, options);
        } else
            throw error;
    }
}

function _writeFileByStream(filepath, readStream, options) {
    return new Promise((resolve, reject) => {
        const wstream = fs.createWriteStream(filepath, options);
        readStream.pipe(wstream);
        wstream.on('close', function () {
            resolve(wstream.path);
        });
        wstream.on('error', async (error) => {
            reject(error);
        });
        readStream.on('error', async (error) => {
            reject(error);
        })
    });
}

/***
 * @author Bakatora
 * @description 异步函数版本删除文件
 * @param filepath 文件绝对路径
 * @returns {Promise<void>}
 */

async function unlink(filepath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filepath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}




