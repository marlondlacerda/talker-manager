const fs = require('fs/promises');

module.exports = async (fileName, data) => {
  const newFile = await fs.writeFile(fileName, JSON.stringify(data, null, 2));
  return newFile;
};