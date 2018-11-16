
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {id: 1, title: 'Iron Man', released: 2008, director: "Jon Favreau", rating: 4},
        {id: 2, title: 'Tropic Thunder', released: 2008, director: "Ben Stiller", rating: 4},
        {id: 3, title: 'Kung Fu Panda', released: 2007, director: "Mark Osborne", rating: 3}
      ]);
    });
};
