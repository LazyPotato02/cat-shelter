const {readFile} = require("../util");

function staticFileHandler(req, res) {
    // can lead to security leak
    // not handling files properly can access files outsode the project
    if (req.url.endsWith('.css')){
        const data = readFile(req.url);
        res.writeHead(200, [
            'Content-Type', 'text/css'
        ]);
        res.write(data)
        res.end()
        return true
    }else if (req.url.endsWith('.ico')){
        const data = readFile(req.url);
        res.writeHead(200, [
            'Content-Type', 'image/svg+xml'
        ]);
        res.write(data)
        res.end()
        return true
    }

    return false
}

module.exports = {
    staticFileHandler
}