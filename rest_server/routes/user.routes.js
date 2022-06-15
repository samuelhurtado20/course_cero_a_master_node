const { Router } = require('express');
//const { check } = require('express-validator');
const check = require('express-validator/check').check;

const { validateFields } = require('../middlewares/valid-fields');
const { isRoleValid, emailExists, userExistsById } = require('../helper/db-validator');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/user.controller');

const router = Router();

router.get('/', usersGet );

router.put('/:id',[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( userExistsById ),
    check('role').custom( isRoleValid ), 
    validateFields
],usersPut );

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required (min 6 digits)').isLength({ min: 6 }),
    check('email', 'Email is required').isEmail(),
    check('email').custom( emailExists ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( isRoleValid ), 
    validateFields
], usersPost );

router.delete('/:id',[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( userExistsById ),
    validateFields
],usersDelete );

router.patch('/', usersPatch );

module.exports = router;