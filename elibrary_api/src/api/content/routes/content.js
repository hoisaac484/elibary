'use strict';

/**
 * content router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::content.content');

module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/contents',
        handler: 'content.find',
        config: {
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/content/check-password',
        handler: 'content.checkPassword',
        config: {
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/files/:token',
        handler: 'content.serveFile',
        config: {
          policies: [],
        },
      },
    ],
  };