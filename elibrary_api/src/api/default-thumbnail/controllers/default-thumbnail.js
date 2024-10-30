'use strict';

/**
 * default-thumbnail controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const jwt = require('jsonwebtoken');

module.exports = createCoreController('api::default-thumbnail.default-thumbnail', ({ strapi }) => ({
    async find(ctx) {
        try {
            const entity = await strapi.entityService.findMany(
                'api::default-thumbnail.default-thumbnail',
                {
                    populate: { picture: true },
                }
            );

            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

            const customizedEntity = {
                ...sanitizedEntity,
                picture: sanitizedEntity.picture ? {
                    alternativeText: sanitizedEntity.picture.alternativeText,
                    url: this.createTokenAndTempUrl(sanitizedEntity.picture.id, '10000y'),
                } : null,
            };

            ctx.send(customizedEntity);
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    createTokenAndTempUrl(fileId, expiresIn) {
        const secret = process.env.JWT_SECRET;

        const token = jwt.sign({ fileId }, secret, { expiresIn });
        const tempUrl = `${strapi.config.server.url}/api/files/${token}`;

        return tempUrl;
    },
}));