'use strict';

/**
 * default-thumbnail service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::default-thumbnail.default-thumbnail');
