/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('user', table => {
    table.index('email');
    table.index('identity_provider_id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('user', table => {
    table.dropIndex('email');
    table.dropIndex('identity_provider_id');
  })
};
