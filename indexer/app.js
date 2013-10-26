"use strict";
var INDEXER = {};

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };	
}

INDEXER.stores = function() {

    var Emitter = require('events').EventEmitter;
    var Mongo = require('mongodb').MongoClient;

    var stores = new Emitter();
    stores.on('checkin', function (id) {});
    stores.on('checkout', function (id) {});
    return stores;
    
    
}();

INDEXER.webapp = function(stores) {

    var bogart = require('bogart');
    var router = bogart.router();
    var app = bogart.app();
    var path =  require('path');
    var viewEngine = bogart.viewEngine('mustache', path.join(bogart.maindir(), 'views'));

    router.get('/stores/:storeId/:event', function(req, res) {
        var	event = req.params.event,
        var storeId = req.params.storeId;
        
        stores.emit(req.params.event, req.params.storeId);

        viewEngine.respond('stores.html', {
            locals: {
                stores: {
                    name:'Home Depot'
                }
            }
        });
    });

    app.use(bogart.batteries);
    app.use(router);
    app.start();

}(INDEXER.stores);
