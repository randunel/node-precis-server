'use strict';

exports.routes = function(map) {
    map.get('/oauth', 'oauth#callback');
    map.get('/oauth/redirect', 'oauth#redirect');
};

