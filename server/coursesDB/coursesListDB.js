const description = require('./description'),
  makeId = require('./makeId');

module.exports =[
    {
      name: 'First course',
      duration: 90,
      date: Date.parse('03/07/2017'),
      description,
      id: makeId(),
      authors : ['Lil Wayne', 'Bob Marley', 'Christina Aguilera', 'Savage Garden']
    },
    {
      name: 'Second course Robot',
      duration: 80,
      date: Date.parse('03/12/2017'),
      description,
      id: makeId(),
      authors : ['Lonestar', 'Enrique Iglesias', 'Vertical Horizon', 'Janet Jackson']
    },
    {
      name: 'Third course Ja-jamboo',
      duration: 120,
      date: Date.parse('03/18/2017'),
      description,
      id: makeId(),
      authors : ['Madonna', 'Destiny\'s Child', 'Ricardo "Rikrok" Ducent', 'Savage Garden']
    },
    {
      name: 'Fourth course play',
      duration: 134,
      date: Date.parse('03/21/2017'),
      description,
      id: makeId(),
      authors : ['Crazy Town', 'Janet Jackson', 'Usher', 'Alicia Keys']
    },
    {
      name: 'Fifth course',
      duration: 60,
      date: Date.parse('03/22/2017'),
      description,
      id: makeId(),
      authors : ['Jennifer Lopez', 'Sean Paul', 'Fantasia', 'James Blunt']
    },
    {
      name: 'Six course Can',
      duration: 55,
      date: Date.parse('03/23/2017'),
      description,
      id: makeId(),
      authors : ['Fergie', 'Rihanna', 'Sean Kingston', 'Fergie']
    },
    {
      name: 'Seventh course Robot',
      duration: 88,
      date: Date.parse('07/07/2017'),
      description,
      id: makeId(),
      authors : ['Nagano', 'Guf', 'Kasta', 'Lady Gaga']
    }
  ];
