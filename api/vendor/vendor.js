var bcrypt = require( 'bcrypt' );
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var VendorSchema = Schema ( {
    id: ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name : String,
    address : String,
    gps : {
        log: Number,
        lat: Number
    },
    category:[],
    menu :[]
} );

exports.Vendor = mongoose.model( 'Vendor', VendorSchema );
