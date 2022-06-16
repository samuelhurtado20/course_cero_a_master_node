const { response } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user.model');
const { generateJWT } = require('../helper/generate-jwt');
const { googleVerify } = require('../helper/google-verify');

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

const googleSignin = async(req, res = response) => {
    const { id_token } = req.body;
    
    try {
        const { email, name, picture } = await googleVerify( id_token );
        let user = await User.findOne({ email });

        if ( !user ) {
            // we need to create a new one
            const data = {
                name,
                email,
                password: ':P,,,,,',
                img: picture,
                google: true,
                role: 'ADMIN_ROLE'
            };
            user = new User( data );
            console.log(data)
            await user.save();
        }

        // if the user state is valid
        if ( !user.state ) {
            return res.status(401).json({
                msg: 'Invalid user'
            });
        }

        // generate token JWT
        const token = await generateJWT( user.id );
        
        res.json({
            user,
            token
        });
        
    } catch (error) {

        res.status(400).json({
            msg: 'Invalid google token'
        })

    }
}

module.exports = {
    login,
    googleSignin
}
