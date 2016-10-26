const request = require('request');

module.exports = {
  getRepos: function(req, res) {
    const accessToken = req.user.accessToken;
    request({
      url: 'https://api.github.com/user/repos?per_page=1000',
      headers: {
        "User-Agent": "AppFabric",
        "Accept": "application/vnd.github.v3+json"
      },
      auth: {
        bearer: accessToken
      }
    },
    function(err, response, body) {
      if(err) { return res.status(500).json(err); }
      const repos = JSON.parse(body).map(function(r) {
        return r.full_name;
      });
      res.json(repos);
    });
  },
  getBranches: function(req, res) {
    const accessToken = req.user.accessToken;
    const owner = req.params.owner;
    const reponame = req.params.reponame;
    request({
      url: 'https://api.github.com/repos/'+owner+'/'+reponame+'/branches?per_page=1000',
      headers: {
        "User-Agent": "AppFabric",
        "Accept": "application/vnd.github.v3+json"
      },
      auth: {
        bearer: accessToken
      }
    },
    function(err, response, body) {
      if(err) { return res.status(500).json(err); }
      const branches = JSON.parse(body).map(function(b) {
        return b.name;
      });
      res.json(branches);
    });
  }
}
