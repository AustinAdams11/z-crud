/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
    table.increments('id').primary().notNullable(); // adds an auto incrementing PK column
    table.string('First_Name').notNullable(); // equivalent of varchar(255)
    table.string('Last_Name').notNullable();
    table.string('Username').notNullable();
    table.string('Password').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
