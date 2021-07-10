const crypto = require('crypto');
const fs  = require('fs');
const { Sequelize } = require('sequelize');


const fakeData = { "data": "key=IAfpK, age=32,key=WNVdi, age=64,key=jp9zt, age=40,key=9snd2, age=32"}
let writer = fs.createWriteStream('test_gfg.txt');
let currentKey;
writer.once('open', function(fd) {
  fakeData.data.split('key=').forEach((item, index) => {
    console.log(item.replaceAll(' '));
    if(index % 2 === 0) currentKey = item;
    else {
      const age = Number.parseInt(item.split('=')[1])
      if(age  === 32) {
        writer.write(currentKey.split('=')[1]+"\n");
      }
    }
  })
});

reader = fs.createReadStream('test_gfg.txt');
 
// Read and display the file data on console
let output = '';
reader.on('data', function (chunk) {
  output += chunk;
});

reader.on('close', function(){
  const shasum = crypto.createHash('sha1')
  shasum.update(output)
  console.log(shasum.digest('hex'));
})

// const name = new Sequelize('postgres://qpcjfvuz:g84Ky_I1vqWx0K9oDpajNuP3neBDypBS@pellefant.db.elephantsql.com/qpcjfvuz')
// name.authenticate().then(() => {
//   name.query("SELECT * FROM users").then(u => console.log(u));
// })
