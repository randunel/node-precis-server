'use strict';

module.exports = function(compound) {
    var fs = require('fs');
    var app = compound.app;

    process.title = 'precis-server';

    app.set('oauth redirect uri', 'https://slack.com/oauth/authorize');
    app.set('oauth access uri', 'https://slack.com/api/oauth.access');
    app.set('scopes', ['read', 'post']);

    try {
        var config = JSON.parse(fs.readFileSync(__dirname + '/slack_app_credentials'));
    } catch(e) {
        console.error(
            'Make sure slack credentials are in config/slack_app_credentials\n' +
            'You can rename config/slack_app_credentials.example and edit the strings in there.'
        );
        process.exit(1);
    }
    app.set('client id', config.client_id);
    app.set('client secret', config.client_secret);
};

