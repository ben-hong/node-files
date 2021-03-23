const axios = require("axios");
const fsP = require("fs").promises;

async function cat(path) {
    try {
        let contents = await fsP.readFile(path, 'utf8');
        console.log(contents);
    } catch(err) {
        
        console.error(err);
        process.exit(1);
    }
}

async function webCat(url) {
    try {
        response = await axios.get(url)
        console.log(response.data)
    } catch(err) {
        console.error('Error: Request failed with status code 404');
        process.exit(1);
    }
}

const arg = process.argv[2];

if (arg.startsWith('http')) {
    webCat(arg);
} else {
    cat(arg);
}
