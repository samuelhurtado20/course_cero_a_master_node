const Role = require('../models/role.model');
const User = require('../models/user.model');

const isRoleValid = async(role = '') => {
    //let rol = new Role({"role":"ADMIN"})
    //await rol.save()
    const existRole = await Role.findOne({role});
    //console.log(existRole)
    if ( !existRole ) {
        throw new Error(`Role: ${ role } is not present in the DB`);
    }
}

const emailExists = async( email = '' ) => {
    // check if the email exist
    const emailExists = await User.findOne({ email });
    if ( emailExists ) {
        throw new Error(`Email: ${ email }, already exist`);
    }
}

const userExistsById = async( id ) => {
    // check if the email exist
    const userExists = await User.findById(id);
    if ( !userExists ) {
        throw new Error(`The id: ${ id } do not exist.`);
    }
}

module.exports = {
    isRoleValid,
    emailExists,
    userExistsById
}
