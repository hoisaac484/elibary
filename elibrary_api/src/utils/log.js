const format_log = (action, event, _user = null) => {
    const { result, params, model } = event;
    const user = _user ?? get_user_info(strapi.requestContext.get());

    const logObject = {
        user_id: user.id,
        user_firstname: user.firstname,
        user_role: (user.roles && user.roles.map(role => role.name)) || undefined,
        performed: action,
        action: model ? getAction(params, model.collectionName) : `User ${action}`,
        Content_Type: model?.collectionName || undefined,
        entry_id: params.where || result.id || undefined,
        entry_data: params.data || undefined,
        details: !model ? params.user : undefined
    };

    return JSON.stringify(logObject, null, 2);
};

const get_user_info = (ctx) => {
    const user = ctx?.state?.user;
    return user ?? { id: 0, firstname: 'N/A', roles: [] };
}

const getAction = (params, collection) => {
    const actions = {
        contents: {
            noData: "Delete entry",
            createdAt: "Create entry",
            id: "Edit entry",
            default: "Publish/Unpublish entry",
        },
        quick_links: {
            noData: "Delete entry",
            createdAt: "Create entry",
            id: "Edit entry",
            default: "Publish/Unpublish entry",
        },
        files: {
            noData: "Delete document/photo",
            createdAt: "Create document/photo",
            default: "Edit file data/location",
        },
        admin_users: {
            noData: "Delete user",
            createdAt: "Create user",
            default: "Edit user data/Enable user/Disable user",
        }
    };

    const collectionActions = actions[collection] || {};
    if (!params.data) return collectionActions.noData || "Not defined";
    if (params.data.createdAt) return collectionActions.createdAt;
    if (params.data.id) return collectionActions.id || collectionActions.default;

    return collectionActions.default || "Not defined";
};

// const getAction = (params, collection) => {
//     var action = "Not defined";
//     if (collection === 'contents' || collection === 'quick_links') {
//         if (!params.data) {
//             action = "Delete entry";
//         }
//         else if (params.data.createdAt) {
//             action = "Create entry";
//         }
//         else if (params.data.id) {
//             action = "Edit entry";
//         }
//         else {
//             action = "Publish/Unpublish entry";
//         }
//     }
//     else if (collection === 'files'){
//         if (!params.data) {
//             action = "Delete file";
//         }
//         else if (params.data.createdAt) {
//             action = "Create file";
//         }
//         else {
//             action = "Edit file data/location";
//         }
//     }
//     else if (collection === 'admin_users'){
//         if (!params.data) {
//             action = "Delete user";
//         }
//         else if (params.data.createdAt) {
//             action = "Create user";
//         }
//         else {
//             action = "Edit user data/Enable user/Disable user";
//         }
//     }

//     return action;
// }

module.exports = { format_log, get_user_info };