const fs = require('fs').promises;

const readFile = require('./readFile');

module.exports = async (fileName, newTalker) => {
  const data = await readFile();

  if (data) { 
    data.push(newTalker);
    const newFile = await fs.writeFile(fileName, JSON.stringify(data, null, 2));
    return newFile;
  }

  const newFile = await fs.writeFile(fileName, JSON.stringify([newTalker], null, 2));
  return newFile;
};
