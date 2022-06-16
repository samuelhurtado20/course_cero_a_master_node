const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const usersGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( from ) )
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        users
    });
}

const usersPost = async(req, res = response) => {
    console.log(req.body)
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // encript password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // save on db
    await user.save();

    res.json({
        user
    });
}

const usersPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if ( password ) {
        // encript password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    await User.findByIdAndUpdate( id, rest );
    const user = await User.findById({_id:id});
    res.json(user);
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - userPatch'
    });
}

const usersDelete = async(req, res = response) => {

    const { id } = req.params;
    // change state
    const user = await User.findByIdAndUpdate( id, { state: false } );
    res.json(user);
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}