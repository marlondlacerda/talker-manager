const fs = require('fs').promises;

module.exports = async (fileName, newTalker) => {
  const data = await fs
    .readFile('./talker.json', 'utf-8')
    .then((response) => JSON.parse(response));

  if (data) { 
    data.push(newTalker);
    const newFile = await fs.writeFile(fileName, JSON.stringify(data, null, 2));
    return newFile;
  }

  const newFile = await fs.writeFile(fileName, JSON.stringify([newTalker], null, 2));
  return newFile;
};
