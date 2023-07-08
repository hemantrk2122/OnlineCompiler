// The FS(File System) module is used for working with the the file system in Node.js. It can read, write, and modify file data.
const fs = require('fs');
// The Path module provides methods for working with file and directory paths. 
// It can join paths, get the current working directory and resolve relative paths
const path = require('path');
// The UUID (Unique Universal Identifier) module is used for generating random unique IDs.
const { v4: uuid } = require('uuid');


const dirCodes = path.join(__dirname, 'codes');
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
    const jobId = uuid();
    const fileName = `${jobId}.${format}`;
    const filePath = path.join(dirCodes, fileName);
    await fs.writeFileSync(filePath, content);
    return filePath;
}

module.exports = {
    generateFile,
};