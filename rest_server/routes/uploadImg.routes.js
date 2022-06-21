const { Router } = require('express');
const check = require('express-validator/check').check;

const { validateFields, validate_upload_file } = require('../middlewares');
const { loadFile, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploadImg.controller');
const { allowedCollections } = require('../helper');

const router = Router();

router.post( '/', validate_upload_file, loadFile );

router.put('/:collection/:id', [
    validate_upload_file,
    check('id','Invalid mongo id').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['Users','Products'] ) ),
    validateFields
//], updateImageCloudinary )
 ], updateImage )

router.get('/:collection/:id', [
    check('id','Invalid mongo id').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['Users','Products'] ) ),
    validateFields
], showImage  )

module.exports = router;