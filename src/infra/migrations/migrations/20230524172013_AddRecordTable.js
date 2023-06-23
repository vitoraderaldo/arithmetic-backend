/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.transaction(function(trx) {
    const query1 = knex.schema.raw(`
      CREATE TABLE record (
        id VARCHAR(36) PRIMARY KEY,
        operation_id TINYINT NOT NULL,
        user_id INT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        user_balance DECIMAL(10,2) NOT NULL,
        operation_response VARCHAR(255) NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

        INDEX idx_record_operation_id (operation_id),
        INDEX idx_record_user_id (user_id)
      );
    `).transacting(trx)

    return Promise.all([query1])
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.transaction(function(trx) {
    return knex.schema.raw(`
      DROP TABLE record;
    `)
    .transacting(trx)
    .then(trx.commit)
    .catch(trx.rollback);
  });
};
