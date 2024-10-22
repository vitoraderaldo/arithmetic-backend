exports.seed = function (knex) {
  return knex('user')
    .del()
    .then(function () {
      return knex('user').insert([
        {
          email: 'vitoraderaldo10@gmail.com',
          status_id: 1,
          current_balance: 1000,
          identity_provider_id: '03fcda3a-c0e1-70ff-2506-4d43166f54f8',
        },
        {
          email: 'testing1@email.com',
          status_id: 1,
          current_balance: 1000,
          identity_provider_id: '53ec2a4a-f001-70bc-0eaf-cada24665347',
        },
        {
          email: 'testing2@email.com',
          status_id: 1,
          current_balance: 1000,
          identity_provider_id: '437c4a2a-e021-7081-d098-fb272b3a3bd2',
        },
        {
          email: 'automation@email.com',
          status_id: 1,
          current_balance: 1000,
          identity_provider_id: '730cda6a-10a1-708a-cc23-05ed531cf3ed',
        },
      ]);
    });
};
