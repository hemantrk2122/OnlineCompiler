const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// we are asing our compiler to go and execute these commands:
// 1. g++ .\fileName.cpp
// 2. .\a.exe

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync({ outputPath })) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    return new Promise((resolve, reject) => {
        exec(
            `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                } if (stderr) {
                    reject({ stderr });
                }
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executeCpp,
};