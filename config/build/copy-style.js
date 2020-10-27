const fs = require('fs');
const path = require('path');
const glob = require('glob');

const pathToElements = path.resolve('lib');
const assetsPaths = glob.sync(
  `${pathToElements}/**/*.?(svg|less|sass|scss|css)`,
);

assetsPaths.forEach(pathToAsset => {
  if (!pathToAsset) {
    return;
  }

  const [, target] = pathToAsset.split('/lib');
  const fileDirectory = path.dirname(target);
  const fileDirectories = fileDirectory.split('/');

  let currentDirectory = path.resolve('./dist');

  fileDirectories.forEach(directory => {
    currentDirectory = path.resolve(currentDirectory, directory);

    if (!fs.existsSync(currentDirectory)) {
      fs.mkdirSync(currentDirectory);
    }
  });

  fs.copyFileSync(pathToAsset, path.resolve(`./dist/${target}`));
});
