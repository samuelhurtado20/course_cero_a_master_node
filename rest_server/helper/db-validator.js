const { Category, Product } = require('../models');
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
    const user = await User.findById(id);
    if ( !user ) {
        throw new Error(`The id: ${ id } do not exist.`);
    }
}

 const categoryExistsById = async( id ) => {
    const exists = await Category.findById(id);
    if ( !exists ) {
        throw new Error(`Category id: ${ id } not found`);
    }
}

const productExistsById = async( id ) => {
    const product = await Product.findById(id);
    if ( !product ) {
        throw new Error(`Product id: ${ id } not found`);
    }
}

const allowedCollections = ( collection = '', collections = []) => {

    const include = collections.includes( collection );
    if ( !include ) {
        throw new Error(`the collection ${ collection } is not allowed ${ collections }`);
    }
    return true;
}

module.exports = {
    isRoleValid,
    emailExists,
    userExistsById,
    categoryExistsById,
    productExistsById,
    allowedCollections
}
