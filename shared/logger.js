// const { Logger, transports } = require('winston');
const winston = require('winston');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const os = require('os');

module.exports.getAppDirectory = () => {
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