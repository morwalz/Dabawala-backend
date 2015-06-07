var express = require('express');
var router = express.Router();
var User = require( '../api/user/controllers' );
var Vendor = require( '../api/vendor/controllers' );


var roleRequired = function ( allowedLevels ) {
    return function ( req, res, next ) {
        if ( allowedLevels.indexOf( req.user.role ) > -1 ) {
            next();
        } else {
            return res.json( {
                message: "You are not authorized"
            }, 403 );
        }
    };
};


/* Map URLs to handlers in this file */
router.post( '/api/signup', User.signup );
router.post( '/api/authenticate', User.authenticate );
router.post( '/admin', User.createAdmin );
router.get( '/api/test', User.test );

router.get( '/api/vendors', Vendor.all);
router.get( '/api/vendors/:id', Vendor.findById);
module.exports = router;
