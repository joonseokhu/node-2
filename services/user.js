const path = require('path');

const GetPath = root => name => {
  return path.join(__dirname, root, `${name}.txt`)
}

const getPath = GetPath('userfiles');

const createUserFile = (name, data) => {
  const filePath = getPath(name);
  return writeFile(filePath, data);
}

const readUserFile = (name) => {
  const filePath = getPath(name);
  return readFile(filePath)
}

module.exports = {
  createUserFile,
  readUserFile,
}