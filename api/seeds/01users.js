/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {First_Name: 'Austin', Last_Name: 'Adams', Username: 'dirtymike', Password: 'password1'},
    {First_Name: 'Charles', Last_Name: 'Jones', Username: 'charleybitmyfinger', Password: 'password2'},
    {First_Name: 'Sally', Last_Name: 'Washington', Username: 'sally', Password: 'password3'},
    {First_Name: 'Noah', Last_Name: 'Lego', Username: 'legoman', Password: 'password4'}
  ]);
};
