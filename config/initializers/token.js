'use strict';

module.exports = function(compound) {
    var request = require('request');
    var User = compound.models.User;
    var app = compound.app;

    compound.issueToken = function issueToken(state, code, cb) {
        User.find(state, function(err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                err = new Error('Invalid state');
                err.details = {
                    state: state,
                    code: code
                };
                return cb(err);
            }
            compound.getTokenForCode(code, function(err, token) {
                if (err) {
                    return cb(err);
                }
                if (!token) {
                    err = new Error('Could not exchange code for token');
                    err.details = {
                        state: state,
                        code: code
                    };
                    return cb(err);
                }
                user.destroy();
                cb(null, token);
            });
        });
    };

    compound.getTokenForCode = function getTokenForCode(code, cb) {
        request(
            app.get('oauth access uri') +
            '?client_id=' + app.get('client id') +
            '&client_secret=' + app.get('client secret') +
            '&code=' + code
        , function(err, res, body) {
            if (err) {
                return cb(err);
            }
            var response;
            try {
                response = JSON.parse(body);
            } catch(err) {
                return cb(err);
            }
            if (response.access_token) {
                return cb(null, response.access_token);
            }
            err = new Error('Unexpected response');
            err.details = {
                response: response
            };
            return cb(err);
        });
    };
};

