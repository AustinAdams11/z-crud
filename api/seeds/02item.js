/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {UsersId: 1, item_name: 'Kona', description: 'Island', quantity: '80'},
    {UsersId: 1, item_name: 'Jamaican Blue Mountain', description: 'Mountain', quantity: '40'},
    {UsersId: 1, item_name: 'Columbian', description: 'Light', quantity: '60'},
  ]);
};
