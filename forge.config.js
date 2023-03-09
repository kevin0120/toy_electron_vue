const path = require('path')


module.exports = {
  packagerConfig: {
    icon:path.join(__dirname, '/resources/imgs/') //Windows and macOS

  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: path.join(__dirname, '/resources/imgs/icon.png')
        }//Linux
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
