'use strict';

module.exports = function(compound) {
    compound.prepareRedirectUri = function prepareRedirectUri(req) {
        var rnd = Math.random();
        compound.models.User.create({
            id: rnd
        });
        return compound.app.get('oauth redirect uri') +
            '?client_id=' + compound.app.get('client id') +
            '&state=' + rnd +
            '&scope=' + compound.app.get('scopes').join()
    };
};

