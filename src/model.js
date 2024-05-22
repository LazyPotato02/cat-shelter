const fs = require('fs/promises')
const fileName =  './data/cats.json'
const path = require('path');
async function readData(){
    const json = await fs.readFile(fileName);
    return JSON.parse(json.toString());
}
async function writeData(data){
    await fs.writeFile(fileName, JSON.stringify(data));
}

async function getCats(){
    const data = await readData();
    return data.cats;
}

async function getBreeds(){
    const data = await readData();
    return data.breeds;
}

async function addBreed(breed){
    const data = await readData();
    data.breeds.push(breed)

    await writeData(data)
}

async function addCats(catData) {
    const data = await readData();
    data.cats.push((JSON.parse(catData)))
    await writeData(data)
}


module.exports = {
    getCats,
    getBreeds,
    addBreed,
    addCats
}