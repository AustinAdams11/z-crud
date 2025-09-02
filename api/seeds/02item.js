/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {UsersId: 1, Item_Name: 'Kona', Description: 'Island', Quantity: '80'},
    {UsersId: 1, Item_Name: 'Jamaican Blue Mountain', Description: 'Mountain', Quantity: '40'},
    {UsersId: 1, Item_Name: 'Columbian', Description: 'Light', Quantity: '60'},
  ]);
};
