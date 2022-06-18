const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Product: Name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: { type: String },
    available: { type: Boolean, defult: true },
    img: { type: String },
});

ProductSchema.methods.toJSON = function() {
    const { __v, state, ...data  } = this.toObject();
    return data;
}

module.exports = model( 'Product', ProductSchema );