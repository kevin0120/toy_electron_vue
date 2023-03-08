
const defaultConfigs = require('./defaultConfig');

const os = require('os');
const path = require('path');
const settings = require('electron-settings');
const fse = require('fs-extra');
const fs = require('fs');



const getAppDirectory = () => {
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

const dir = getAppDirectory();
const isExist = fs.existsSync(dir);
if (!isExist) {
  fse.mkdirpSync(dir);
}

settings.setPath(path.join(dir, 'setting.json'));

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  settings.deleteAll();
}

if (Object.keys(settings.getAll()).length === 0) {
  settings.setAll(defaultConfigs);
}

module.exports.configs = settings.getAll();
