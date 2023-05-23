/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.transaction(function(trx) {

    const query1 = knex.schema.raw(`
      CREATE TABLE user_status (
        id TINYINT AUTO_INCREMENT PRIMARY KEY,
        name ENUM('Active', 'Inactive') NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
      );
    `).transacting(trx)

    const query2 = knex.schema.raw(`
      INSERT INTO user_status (id, name) VALUES
        (1, 'Active'),
        (2, 'Inactive')
      ;
    `).transacting(trx)

    const query3 = knex.schema.raw(`
      CREATE TABLE user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        status_id TINYINT NOT NULL,
        current_balance DECIMAL(10,2) NOT NULL,
        identity_provider_id VARCHAR(100) NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,

        FOREIGN KEY (status_id) REFERENCES user_status(id)
    );

  `).transacting(trx)

  return Promise.all([query1, query2, query3])
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
      DROP TABLE user;
      DROP TABLE user_status;
    `)
    .transacting(trx)
    .then(trx.commit)
    .catch(trx.rollback);
  });
};
