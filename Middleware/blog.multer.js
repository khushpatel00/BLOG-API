const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/'))
    }, 
    filename: (req, file, cb) => {
        cb(null, `cover_${req.body.title}${Date.now()}${path.extname(file.originalname)}`)
    }
})
module.exports = multer({storage})