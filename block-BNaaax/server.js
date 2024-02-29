// writeCode

// 1. console.log(\_\_dirname);
// 2. console.log(\_\_filename);
// 3. use path module to join `__dirname` and `server.js`

const path = require('path');
const dirname=__dirname;
const filename=__filename;
console.log(dirname);
console.log(filename);
const fullPath=path.join(dirname+'server.js');
console.log(fullPath);