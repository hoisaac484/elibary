'use strict';

/**
 * default-thumbnail router
 */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::default-thumbnail.default-thumbnail');

module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/default-thumbnail',
        handler: 'default-thumbnail.find',
        config: {
          policies: [],
        },
      },
    ],
  };
