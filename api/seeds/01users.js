/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'Austin', last_name: 'Adams', username: 'dirtymike', password: 'password1'},
    {first_name: 'Charles', last_name: 'Jones', username: 'charleybitmyfinger', password: 'password2'},
    {first_name: 'Sally', last_name: 'Washington', username: 'sally', password: 'password3'},
    {first_name: 'Noah', last_name: 'Lego', username: 'legoman', password: 'password4'}
  ]);
};
