const description = require('./description'),
  makeId = require('./makeId');

module.exports =[
  {
    name: 'First course',
    duration: 90,
    date: Date.parse('03/07/2017'),
    description,
    id: makeId(),
    authors : ['Lil Wayne', 'Bob Marley', 'Christina Aguilera', 'Savage Garden'],
    creator: 'q'
  }
];
