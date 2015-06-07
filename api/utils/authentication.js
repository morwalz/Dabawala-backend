var jwt = require( 'jsonwebtoken' );


var jwtSecret ="jwtSerect";
var jwtExpires ="50000";


exports.makeToken = function ( user ) {

    var token = {
        id: user._id,
        email: user.email,
        role: user.role
    };

    return jwt.sign( token, jwtSecret, { expiresInMinutes: jwtExpires } );

};
