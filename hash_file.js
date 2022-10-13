
const fs = require('fs');
var dir = "HashedFolder"
function encrypt(file_name) {
    const crypto = require("crypto")
    const items = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]|\\*+-~!@#$%^&*()_+`-="
    var output = ""
    var passwordLength = Math.floor(Math.random() * 100)
    for (let i = 0; i < passwordLength; i++) {
        output += items[Math.floor(Math.random() * items.length)]
    }
    fs.readFile(file_name, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        var crypto = require('crypto');
        var hash = crypto.createHash('sha512').update(data + output).digest('hex');
        fs.writeFile(file_name, hash+"\n      "+file_name, err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

    });
}
fs.readdir(dir, (err, files) => {
    if (err) {
      throw err
    }
    files.forEach((file) => {
        console.log(file)
        encrypt(`./${dir}/${file}`)
    })
})