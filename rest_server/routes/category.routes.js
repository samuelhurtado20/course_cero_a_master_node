const { Router } = require('express');
const check = require('express-validator/check').check;

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const { saveCategory,
        getCategories,
        getCategory,
        updateCategory,
        deleteCategory} = require('../controllers/category.controller');
const { categoryExistsById } = require('../helper/db-validator');

const router = Router();

router.get('/', getCategories );

router.get('/:id',[
    check('id', 'Invalid mongo ID').isMongoId(),
    check('id').custom( categoryExistsById ),
    validateFields,
], getCategory );

router.post('/', [ 
    validateJWT,
    check('name','Category name is required').not().isEmpty(),
    validateFields
], saveCategory );

router.put('/:id',[
    validateJWT,
    check('name','Category name is required').not().isEmpty(),
    check('id').custom( categoryExistsById ),
    validateFields
], updateCategory );

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'Invalid mongo ID').isMongoId(),
    check('id').custom( categoryExistsById ),
    validateFields,
], deleteCategory);

module.exports = router;