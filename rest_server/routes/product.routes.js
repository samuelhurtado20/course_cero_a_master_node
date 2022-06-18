const { Router } = require('express');
const check = require('express-validator/check').check;

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const { saveProduct,
        getProducts,
        getProduct,
        updateProduct, 
        deleteProduct } = require('../controllers/product.controller');

const { categoryExistsById, productExistsById } = require('../helper/db-validator');

const router = Router();

router.get('/', getProducts );

router.get('/:id',[
    check('id', 'Invalid mongo id').isMongoId(),
    check('id').custom( productExistsById ),
    validateFields,
], getProduct );

router.post('/', [ 
    validateJWT,
    check('name','Product: name is required.').not().isEmpty(),
    check('category','Invalid mongo id').isMongoId(),
    check('category').custom( categoryExistsById ),
    validateFields
], saveProduct );

router.put('/:id',[
    validateJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( productExistsById ),
    validateFields
], updateProduct );

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'Invalid mongo id').isMongoId(),
    check('id').custom( productExistsById ),
    validateFields,
], deleteProduct);


module.exports = router;