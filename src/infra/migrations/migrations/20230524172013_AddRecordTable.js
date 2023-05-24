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

        FOREIGN KEY (operation_id) REFERENCES operation(id),
        FOREIGN KEY (user_id) REFERENCES user(id)
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
