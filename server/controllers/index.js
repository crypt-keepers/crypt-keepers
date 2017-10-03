const models = require('../models');

module.exports = {
  range: {
    get: (req, res) => {
      models.range.get()
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          // placeholder for response 404
          res.status(404).send();
          throw err;
        });
    },
    post: (req, res) => {
      models.range.post()
        .then(() => {
          res.status(201).send();
        })
        .catch((err) => {
          // placeholder for response 404
          res.status(404).send();
          throw err;
        });
    },
  },

  search: {
    get: (req, res) => {
      models.search.get()
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          // placeholder for response 404
          res.status(404).send();
          throw err;
        });
    },
    post: (req, res) => {
      models.search.post()
        .then(() => {
          res.status(201).send();
        })
        .catch((err) => {
          // placeholder for response 404
          res.status(404).send();
          throw err;
        });
    },
  },

  list: {
    get: (req, res) => {
      models.list.get()
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          // placeholder for response 404
          res.status(404).send();
          throw err;
        });
    },
    post: (req, res) => {
      models.list.post()
        .then(() => {
          res.status(201).send();
        })
        .catch((err) => {
          // placeholder for response 404
          res.status(404).send();
          throw err;
        });
    },
  },

  user: {
    get: (req, res) => {
      models.user.get()
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          // placeholder for response 404
          res.status(404).send();
          throw err;
        });
    },
    post: (req, res) => {
      models.user.post()
        .then(() => {
          res.status(201).send();
        })
        .catch((err) => {
          // placeholder for response 404
          res.status(404).send();
          throw err;
        });
    },
  },

};
