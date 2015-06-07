var express = require( 'express' );
var path = require( 'path' );
var logger = require( 'morgan' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
var expressJwt = require( 'express-jwt' );
var expressValidator = require( 'express-validator' );


var routes = require( './routes/index' );


var app = express();

app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );
app.use( expressValidator() );
app.use( express.static( path.join( __dirname, 'public' ) ) );
/*app.use( expressJwt( {
    secret:"jwtSerect",
    skip: [
        '/api/signup',
        '/api/authenticate',
        '/api/admin/authenticate',
        '/api/test',
        '/api/vendors',
        '/api/vendors/!*'
    ]
} ) );*/


// Use routes.index to map URLs to handlers in ./api
app.use( '/', routes );


/// catch 404 and forwarding to error handler
app.use( function ( req, res, next ) {
    var err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
} );


// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
    app.use( function ( err, req, res, next ) {
        var status = err.status || 500;
        res.json( {
            message: err.message,
            error: err
        }, status );
    } );
}


// production error handler
// no stacktraces leaked to user
app.use( function ( err, req, res, next ) {
    var status = err.status || 500;
    res.json( {
        message: err.message
    }, status );
} );


// connect to the db
var MONGO_DB;
MONGO_DB ="mongodb://localhost:27017/event";
mongoose.connect(MONGO_DB);
var db = mongoose.connection;

app.set( 'port', process.env.PORT || 3000 );

var server = app.listen( app.get( 'port' ), function () {
    console.log( 'Express server listening on port ' + server.address().port );
} );
