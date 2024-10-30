'use strict';
const {format_log, get_user_info} = require('./utils/log');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your silly model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    strapi.format_log = format_log;
    strapi.get_user_info = get_user_info;

    // registering a subscriber
    strapi.db.lifecycles.subscribe({ 
      afterCreate(event) {
 
        let log = strapi.format_log('create', event)
        strapi.log.silly(log)
      },
      afterUpdate(event) {
   
        let log = strapi.format_log('update', event)
        strapi.log.silly(log)
      },      
      afterDelete(event) {

        let log = strapi.format_log('delete', event)
        strapi.log.silly(log)
      }
    });
  }
};