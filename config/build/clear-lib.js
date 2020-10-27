const path = require('path');
const rimraf = require('rimraf');
const glob = require('glob');

const pathToDist = path.join(process.cwd(), 'dist');
const paths = glob.sync(
  `${pathToDist}/**/?(stories|__tests__|__test__|tests|test)`,
);

paths.forEach(item => {
  rimraf.sync(item);
});
