const winston = require('winston');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const os = require('os');


function getAppDirectory() {
    switch (process.platform) {
        case 'darwin':
            return process.execPath.substring(
                0,
                process.execPath.indexOf('.app') + 4
            );
        case 'linux':
        case 'win32':
            return path.join(os.homedir(), '.controlPanel_sa');
        default:
    }
};

const homeDir = getAppDirectory();

const dir = path.join(homeDir, 'logs');

let gLogger = null;

const cpFormate = info => `${info.timestamp} ${info.level}: ${info.message}`;

function CreateDailyLogger() {
    const isExist = fs.existsSync(dir);
    if (!isExist) {
        fse.mkdirpSync(dir);
    }
    if (gLogger === null) {
        gLogger = new winston.Logger({
            level: 'info',
            transports: [
                new winston.transports.File({
                    name: 'info',
                    filename: path.join(homeDir, 'logs/event.log'),
                    level: 'info',
                    tailable: true,
                    maxFiles: 10,
                    maxsize: 65535 * 5,
                    zippedArchive: true,
                    formatter: cpFormate
                })
                // new transports.File({
                //   name: "alarm-file",
                //   filename: './logs/alarm.log',
                //   level: 'error',
                //   tailable: true,
                //   maxFiles: 10,
                //   maxsize: 65535,
                //   formatter: cpFormate,
                //   zippedArchive: true
                // }),
            ],
            exitOnError: false,
            levels: {error: 0, warn: 1, maintenance: 2, info: 3}
        });
        winston.addColors({
            error: '#ffa21a',
            warn: '#ffa21a',
            info: '#00d3ee',
            maintenance: '#ffa21a',
            query: '#00d3ee'
        });
    }
}

function Info(msg, meta) {
    if (gLogger === null) return;
    gLogger.info(msg, {meta});
}

function Warn(msg, meta) {
    if (gLogger === null) return;
    gLogger.warn(msg, {meta});
}

function Maintenance(msg, meta) {
    if (gLogger === null) return;
    gLogger.maintenance(msg, {meta});
}

function Error(msg, meta) {
    if (gLogger === null) return;
    gLogger.error(msg, {meta});
}

function Query(options, f) {
    if (gLogger === null) {
        return;
    }
    return gLogger.query(options, f);
}


module.exports.getAppDirectory = getAppDirectory

module.exports.CreateDailyLogger = CreateDailyLogger
module.exports.Info = Info
module.exports.Warn = Warn
module.exports.Error = Error
module.exports.Query = Query

