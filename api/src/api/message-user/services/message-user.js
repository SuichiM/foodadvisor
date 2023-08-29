'use strict';

/**
 * message-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::message-user.message-user');
