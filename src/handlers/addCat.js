const {readFile, readTemplate, layout} = require("../util");
const {getBreeds, addBreed,addCats} = require("../model");
const formidable = require('formidable');
const {json} = require("formidable");
function breedFragment(breed){
    return `<option name='breed' value="${breed}">${breed}</option>`
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
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        // Construct cat data object
        const catData = {
            name: String(fields.name),
            breed: String(fields.breed),
            description: String(fields.description),
            imageUrl: []
        };

        // Process file uploads
        if (files.upload && files.upload.length > 0) {
            for (const file of files.upload) {
                const fileDetails = {
                    filepath: file.path,
                    size: file.size,
                    mimetype: file.type,
                    originalFilename: file.name
                };
                catData.imageUrl.push(fileDetails);
            }
        }

        // Convert catData to JSON string
        const jsonData = JSON.stringify(catData);
        if (jsonData){
            addCats(jsonData)

            res.writeHead(301,[
                'Location','/'
            ])
            res.end()

        }else{

            res.writeHead(301,[
                'Location','/cats/add-cat'
            ])
            res.end()
        }
    })


}

module.exports = {
    addCatHandler,
    postCatHandler
}