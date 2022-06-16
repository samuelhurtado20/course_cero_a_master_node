const { response } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user.model');
const { generateJWT } = require('../helper/generate-jwt');

const login = async(req, res = response) => {

    try {
        const { email, password } = req.body;
      
        // check if the email exists
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Invalid: Email / Password - email'
            });
        }

        // If the user is active
        if ( !user.state ) {
            return res.status(400).json({
                msg: 'Invalid: Email / Password - estado: false'
            });
        }

        // check password
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Invalid: Email / Password - password'
            });
        }
        
        // generate JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }   

}

module.exports = {
    login
}
