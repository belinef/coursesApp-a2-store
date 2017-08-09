const usersDB = require('../usersDB');

class BaseMethods {
    checkLogin(req, res) {
        const {password , user} = req.body;

      if (!usersDB[user]) {
        res.send({
          user,
          logged: false,
          error : 'Wrong Login'
        });

        return;
      }
      if (usersDB[user].password !== password) {
        res.send({
          user,
          logged: false,
          error : 'Wrong Password'
        });
      } else {
        res.cookie('user', user);

        res.send({
          user,
          logged: true,
          avatar: usersDB[user].avatar
        });
      }
    }

  logOut(req, res) {
    res.cookie('user', '');
    res.send({});
  }
}

module.exports = BaseMethods;
