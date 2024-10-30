'use strict';

const fs = require('fs');
const path = require('path');

const { createCoreController } = require('@strapi/strapi').factories;
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = createCoreController('api::content.content', ({ strapi }) => ({
    async find(ctx) {
        try {
            const entries = await strapi.entityService.findMany('api::content.content', ctx.query);
            
            // url
            const sanitizedEntries = entries
                .filter(entry => entry.publishedAt !== null && entry.Document !== null)
                .map(entry => {
                    const { password, Document, createdBy, updatedBy, Picture, ...rest } = entry;
                    return {
                        ...rest,
                        Document: Document ? {
                            id: Document.id,
                            alternativeText: Document.alternativeText
                        } : null,
                        Picture: Picture ? Picture.map(pic => ({
                            id: pic.id,
                            alternativeText: pic.alternativeText,
                            url: this.createTokenAndTempUrl(pic.id, '1h'),
                        })) : null,
                    };
                });

            ctx.send(sanitizedEntries);
        } catch (error) {
            ctx.send({ message: 'An error occurred', error: error.message }, 500);
        }
    },

    async checkPassword(ctx) {
        try {
            // const { id, password } = ctx.request.body;
            const { id } = ctx.request.body;
            const expiresIn = '1h';

            // Fetch the entry by id
            const entry = await strapi.entityService.findOne('api::content.content', id, {
                populate: { Document: true },
            });

            if (!entry) {
                return ctx.send({ message: 'Entry not found' }, 404);
            }

            // Compare passwords using bcrypt
            // const isMatch = await bcrypt.compare(password, entry.password);

            // if (isMatch) {
                const tempUrl = this.createTokenAndTempUrl(entry.Document.id, expiresIn);

                ctx.send({ message: true, tempUrl });
            // } else {
            //     ctx.send({ message: false }, 401);
            // }
        } catch (error) {
            ctx.send({ message: 'An error occurred', error: error.message }, 500);
        }
    },

    createTokenAndTempUrl(fileId, expiresIn) {
        const secret = process.env.JWT_SECRET;

        const token = jwt.sign({ fileId }, secret, { expiresIn });
        const tempUrl = `${strapi.config.server.url}/api/files/${token}`;

        return tempUrl;
    },

    async serveFile(ctx) {
        const { token } = ctx.params; // Assuming token is passed as a parameter
        const secret = process.env.JWT_SECRET;

        try {
            // Verify the JWT token
            const decoded = jwt.verify(token, secret);
            const fileId = decoded.fileId;

            // Fetch the file using the fileId from the token
            const file = await strapi.entityService.findOne('plugin::upload.file', fileId);

            if (!file) {
                return ctx.notFound('File not found');
            }
            // Construct the file path
            const filePath = path.join(strapi.dirs.static.public, file.url);

            ctx.set('Access-Control-Expose-Headers', '*');
            ctx.set('Content-Disposition', `attachment; filename="${file.name}"`);
            ctx.type = file.mime;
            ctx.body = fs.createReadStream(filePath);
        } catch (error) {
            ctx.unauthorized('Invalid or expired token');
        }
    },
}));