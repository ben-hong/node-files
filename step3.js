const axios = require("axios");
const fsP = require("fs").promises;

async function cat(path, writeToPath) {
    try {
        let contents = await fsP.readFile(path, 'utf8');
        if (writeToPath) {
            writeOutput(writeToPath, contents);
        } else {
            console.log(contents);
        }
    } catch(err) {
        
        console.error(err);
        process.exit(1);
    }
}

async function webCat(url, writeToPath) {
    try {
        response = await axios.get(url);
        if (writeToPath) {
            writeOutput(writeToPath, response.data);
        } else {
            console.log(response.data);
        }
    } catch(err) {
        console.error('Error: Request failed with status code 404');
        process.exit(1);
    }
}

async function writeOutput(path, content) {
    try {
        await fsP.writeFile(path, content, 'utf8');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('successfully wrote to file')
}

const arg2 = process.argv[2];
const arg3 = process.argv[3];
const arg4 = process.argv[4];

if (arg2 === '--out') {
    if (arg4.startsWith('http')) {
        webCat(arg4, arg3);
    } else {
        cat(arg4, arg3);
    }
} else {
    if (arg2.startsWith('http')) {
        webCat(arg2);
    } else {
        cat(arg2);
    }
}


