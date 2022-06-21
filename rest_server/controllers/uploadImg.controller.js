const path = require('path');
const fs   = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');
const { uploadFile } = require('../helper');

const { User, Product } = require('../models');

const loadFile = async(req, res = response) => {
    try {        
        // txt, md
        // const name = await uploadFile( req.files, ['txt','md'], 'textos' );
        const name = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ name });

    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const updateImage = async(req, res = response ) => {
    const { id, collection } = req.params;
    let model;
    switch ( collection ) {
        case 'Users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `User not found with id: ${ id }`
                });
            }        
        break;
        case 'Products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `Product not found with id: ${ id }`
                });
            }        
        break;    
        default:
            return res.status(500).json({ msg: 'Invalid option, path or id'});
    }

    // clean older images
    if ( model.img ) {
        // delete img from server
        const pathImagen = path.join( __dirname, '../uploads', collection, model.img );
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }
    }

    const name = await uploadFile( req.files, undefined, collection );
    model.img = name;
    await model.save();
    res.json( model );
}

const updateImageCloudinary = async(req, res = response ) => {
    const { id, collection } = req.params;
    let model;
    switch ( collection ) {
        case 'Users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `Users not found with id: ${ id }`
                });
            }        
        break;
        case 'Products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `Product not found with id: ${ id }`
                });
            }        
        break;    
        default:
            return res.status(500).json({ msg: 'Invalid option, path or id'});
    }

    // clean older images
    if ( model.img ) {
        const nameArr = model.img.split('/');
        const name    = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.file
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    model.img = secure_url;
    await model.save();
    res.json( model );
}

const showImage = async(req, res = response ) => {
    const { id, collection } = req.params;
    let model;
    switch ( collection ) {
        case 'Users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `User not found with id ${ id }`
                });
            }        
        break;
        case 'Products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `Product not found with id ${ id }`
                });
            }        
        break;    
        default:
            return res.status(500).json({ msg: 'Invalid option, path or id. ' + collection });
    }
    // clean older images
    if ( model.img ) {
        // You have to delete the image from the server
        const pathImagen = path.join( __dirname, '../uploads', collection, model.img );
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen )
        }
    }

    const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( pathImagen );
}

module.exports = {
    loadFile,
    updateImage,
    showImage,
    updateImageCloudinary
}