const fs = require("fs");

const newDate = () => new Date().getTime();

function writeJSONFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {
  newDate,
  writeJSONFile,
};
