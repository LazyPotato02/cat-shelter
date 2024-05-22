const {readFile, readTemplate, layout} = require("../util");
const {getBreeds, addBreed} = require("../model");

function breedFragment(breed){
    return `<option value="${breed}">${breed}</option>`
}

async function addCatHandler(req, res) {
    const template = await readTemplate('addCat');
    const breeds = await getBreeds();
    const html = template.replace('%%breeds%%',breeds.map(breedFragment).join('\n'));
    res.writeHead(200, [
        'Content-Type', 'text/html'
    ]);
    res.write(await layout(html));

    res.end()
}



async function postCatHandler(req,res){
    console.log(true)
}

module.exports = {
    addCatHandler,
    postCatHandler
}