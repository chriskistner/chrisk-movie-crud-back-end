
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {id: 1, title: 'Iron Man', released: 2008, director: "Jon Favreau", rating: 4, poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg"},
        {id: 2, title: 'Tropic Thunder', released: 2008, director: "Ben Stiller", rating: 4, poster: 'https://m.media-amazon.com/images/M/MV5BNDE5NjQzMDkzOF5BMl5BanBnXkFtZTcwODI3ODI3MQ@@._V1_.jpg'},
        {id: 3, title: 'Kung Fu Panda', released: 2007, director: "Mark Osborne", rating: 3, poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Kungfupanda.jpg/220px-Kungfupanda.jpg'}
      ]);
    }).then(() => {
      return knex.raw(
        `SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies));`
      );
    })
};

