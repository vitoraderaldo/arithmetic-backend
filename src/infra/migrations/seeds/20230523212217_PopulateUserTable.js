exports.seed = function(knex) {
  return knex('user').del()
    .then(function () {
      return knex('user').insert([
        {email: 'vitoraderaldo10@gmail.com', status_id: 1, current_balance: 1000, identity_provider_id: '42c1b6de-a705-45be-ac81-6d9131f9a880' }
      ]);
    });
};
