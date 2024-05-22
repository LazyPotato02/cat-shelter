const {readFile} = require("../util");

function staticFileHandler(req, res) {
    // can lead to security leak
    // not handling files properly can access files outsode the project
    if (req.url.endsWith('.css')){
        sendFile(req.url, res, 'text/css')
        return true
    }else if (req.url.endsWith('.ico')){
        sendFile(req.url, res,'image/svg+xml')
        return true
    }

    return false
}

async function sendFile(path,res,contentType){
    const data = await  readFile(path);
    res.writeHead(200, [
        'Content-Type', contentType
    ]);
    data.pipe(res)

}


module.exports = {
    staticFileHandler
}