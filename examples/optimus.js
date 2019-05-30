const app = require('../index.js')();
const port = 3000;

app.get('/', (req, res) => res.send(JSON.stringify({"status" : "200", "msg": "Hello World!"})));
app.get('/ping', (req, res) => res.send(JSON.stringify({"status" : "200", "msg": "pong"})));
app.get('/users/:id', (req, res) => res.send(JSON.stringify({"status" : "200", "msg": "Hello user with id " + req.params.id})));
app.get('/users/:id/groups/:group', (req, res) => res.send(JSON.stringify({"status" : "200", "msg": "User id: " + req.params.id + "& Group id: " + req.params.group})));
app.post('/users/create', (req, res) => { 
  console.log("BODY IN XAMPLE");
  console.log(req.body);
  res.send(JSON.stringify({"status" : "200", "msg": "User created."}));
});
app.listen(port, () => console.log('Optimus micro app listening on port ' + port));
