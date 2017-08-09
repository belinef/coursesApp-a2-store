const profileDB = require('./profileDB');

class ProfilesCollection {
  getProfile(req, res) {
    const {cookies:{user}} = req;

    if (profileDB[user]) {
      res.json(profileDB[user])
    } else {
      res.status(400).end();
    }
  }

  updateProfile(req, res) {
    const {cookies:{user}, body: {prop, value }} = req;

    profileDB[user][prop] = value;


    res.json(profileDB[user]);
  }
}

module.exports = new ProfilesCollection();
