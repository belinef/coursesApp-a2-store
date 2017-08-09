const admin = {
  online: false
};

let usersOnline = [];

module.exports = (io) => (socket) => {
  const [{user}] = socket.handshake
    .headers
    .cookie
    .split(';')
    .map(item => item.trim().split('='))
    .filter(item => item[0] === 'user')
    .map(item => ({user : item[1]}));

  if(user === 'admin') {
    admin.online = true;
  } else if (!usersOnline.includes(user)) {
    usersOnline.push(user);
  }

  console.log(`${user} connected`);

  io.emit('usersOnline', usersOnline);
  io.emit('admin', admin);

  socket.on('disconnect', function(){
    if(user === 'admin') {
      admin.online = false;
    }

    usersOnline = usersOnline.filter(item => user !== item);

    io.emit('usersOnline', usersOnline);
    io.emit('admin', admin);
    console.log('disconnected');
  });

  socket.on('from-admin-message', ({message, sendTo}) => {
    io.emit(`message.from.admin`, {type:'new-message', text: message, sendTo });
    io.emit(`message.${sendTo}`, {type:'new-message', text: message, user });
  });

  socket.on('from-user-message', (message) => {
    io.emit(`message.${user}`, {type:'new-message', text: message, user });
    io.emit(`message`, {type:'new-message', text: message, user });
  });
};
