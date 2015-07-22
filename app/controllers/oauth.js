'use strict';

function OAuthController() {
}

module.exports = OAuthController;

OAuthController.prototype.redirect = function redirect(c) {
    c.redirect(c.compound.prepareRedirectUri(c.req));
};

OAuthController.prototype.callback = function callback(c) {
    var state = c.req.param('state');
    var code = c.req.param('code');
    if (!state || !code) {
        return sendError(c);
    }
    c.compound.issueToken(state, code, function(err, token) {
        if (err) {
            return sendError(c);
        }
        c.send('Use this token for your précis app:\n' + token);
    });
};

function sendError(c) {
    c.send('?!', 400);
}

