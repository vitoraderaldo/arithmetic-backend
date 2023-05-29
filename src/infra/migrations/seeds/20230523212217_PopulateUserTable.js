exports.seed = function(knex) {
  return knex('user').del()
    .then(function () {
      return knex('user').insert([
        {email: 'vitoraderaldo10@gmail.com', status_id: 1, current_balance: 1000, identity_provider_id: '42c1b6de-a705-45be-ac81-6d9131f9a880' },
        {email: 'testing1@email.com', status_id: 1, current_balance: 1000, identity_provider_id: '790b0b1e-302f-4b81-8fff-c4a498386772' },
        {email: 'testing2@email.com', status_id: 1, current_balance: 1000, identity_provider_id: 'e010ac9a-ea67-4e1f-a176-7d240a50ff73' },
        {email: 'automation@email.com', status_id: 1, current_balance: 1000, identity_provider_id: 'a744d142-5030-4d40-8287-b5b9fc65c1cf' },
      ]);
    });
};
