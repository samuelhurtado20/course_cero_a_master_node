const { response } = require("express")

const validate_upload_file = (req, res = response, next ) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        return res.status(400).json({
            msg: 'There are no file to upload - validate_upload_file'
        });
    }

    next();
}

module.exports = {
    validate_upload_file
}
