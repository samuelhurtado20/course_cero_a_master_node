const { Router } = require('express');
const check = require('express-validator/check').check;
const { validateFields } = require('../middlewares/valid-fields');
const { login } = require('../controllers/auth.controller');

const router = Router();

router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    //validateFields
], login );



module.exports = router;