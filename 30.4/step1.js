const fs = require('fs');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

cat(process.argv[2]);