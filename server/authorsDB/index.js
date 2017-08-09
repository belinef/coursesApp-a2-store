const fakeDB = require('./initialDB');

class AthorsCollection {

    getCollection(req, res) {
        const {search} = req.query,
            response = {
                authors: []
            };
        response.authors = fakeDB.authors.filter(item => {
            return item.includes(search);
        });

        const sendResult = () => {
            res.send(response);
        };

        setTimeout(sendResult, 4000);
    }

    create(req, res) {
        const {name} = req.body;

        if (!fakeDB.authors.includes(name)) {
            fakeDB.authors.push(name);
            res.send({created: true, name});
        } else {
            res.send({
                created: false,
                error: 'Author already exist'
            });
        }

    }
}


module.exports = new AthorsCollection();