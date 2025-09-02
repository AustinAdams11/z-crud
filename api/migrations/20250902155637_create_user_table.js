/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
    table.increments('id').primary().notNullable(); // adds an auto incrementing PK column
    table.string('first_name').notNullable(); // equivalent of varchar(255)
    table.string('last_name').notNullable();
    table.string('username').notNullable();
    table.string('password').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
