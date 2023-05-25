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
      name VARCHAR(255) NOT NULL,
      cost DECIMAL(10,2) NOT NULL,
      inputs_required TINYINT NOT NULL,
      date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_type (type)
    );
  `).transacting(trx)

  const query2 = knex.schema.raw(`
    INSERT INTO operation (type, name, cost, inputs_required) VALUES
    ('ADDITION', 'Addition', 1.10, 2),
    ('SUBTRACTION', 'Subtraction', 2.05, 2),
    ('MULTIPLICATION', 'Multiplication', 1.00, 2),
    ('DIVISION', 'Division', 3.4, 2),
    ('SQUARE_ROOT', 'Square Root', 3.5, 1),
    ('RANDOM_STRING', 'Random String', 0.5, 0);
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
