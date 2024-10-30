'use strict';

/**
 * quick-link service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::quick-link.quick-link');
