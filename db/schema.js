'use strict';

define('User', function() {
    property('id', String);
    property('createdAt', Date);

    set('expire', 3e4);
});

