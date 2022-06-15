//const { validationResult } = require('express-validator');
const validationResult = require('express-validator/check').validationResult;

const validateFields = ( req, res, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        console.log(errors.array())
        return res.status(400).json(errors.array());
    }

    next();
}

module.exports = {
    validateFields
}