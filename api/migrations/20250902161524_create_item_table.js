/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('item', table => {
    table.increments().primary().notNullable(); // adds an auto incrementing PK column
    table.integer('UsersId').references('users.id').notNullable();// equivalent of varchar(255)
    table.string('item_name').notNullable();
    table.string('description').notNullable();
    table.integer('quantity').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('item');
};
