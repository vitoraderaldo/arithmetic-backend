/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.transaction(function(trx) {

  const query1 = knex.schema.raw(`
    CREATE TABLE operation (
      id TINYINT AUTO_INCREMENT PRIMARY KEY,
      type ENUM('ADDITION','SUBTRACTION','MULTIPLICATION','DIVISION','SQUARE_ROOT','RANDOM_STRING') NOT NULL,
      cost DECIMAL(10,2) NOT NULL,
      date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_type (type)
    );
  `).transacting(trx)

  const query2 = knex.schema.raw(`
    INSERT INTO operation (type, cost) VALUES
    ('ADDITION', 1.10),
    ('SUBTRACTION', 2.05),
    ('MULTIPLICATION', 1.00),
    ('DIVISION', 3.4),
    ('SQUARE_ROOT', 3.5),
    ('RANDOM_STRING', 0.5);
  `).transacting(trx)

  return Promise.all([query1, query2])
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
      DROP TABLE operation;
    `)
    .transacting(trx)
    .then(trx.commit)
    .catch(trx.rollback);
  });
};
