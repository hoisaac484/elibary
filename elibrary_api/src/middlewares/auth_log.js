module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
        await next();
        if (ctx.path === '/admin/login' && ctx.method === 'POST') {
            if (ctx.response.status === 200) {
                const user = ctx.response.body.data.user;
                let log = strapi.format_log(
                    'login',
                    {
                        result: { 'status': 'success' },
                        params: { 'user': user }
                    }
                    , user
                )
                strapi.log.silly(log);
            }
        } else if (ctx.path === '/admin/logout' && ctx.method === 'POST') {
            let log = strapi.format_log(
                'logout',
                {
                    result: { 'status': 'success' },
                    params: { 'status': 'success' }
                }
            )
            strapi.log.silly(log);
        }
    };
};