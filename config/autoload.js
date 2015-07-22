'use strict';

module.exports = function() {
    console.log('autoloading');
    return ['jugglingdb'].map(require);
};

