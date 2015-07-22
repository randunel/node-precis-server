'use strict';

module.exports = function(compound, User) {
    console.log('User model initializing');
    User.beforeCreate = function beforeCreate(next, data) {
        data.createdAt = new Date();
        next();
    };
};

