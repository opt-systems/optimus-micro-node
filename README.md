# OPTIMUS MICRO node.js

- Simple and fast microservice / http REST server for node.js

## Features
- Part of the optimus-micro family
- No dependencies (only http module)
- Simple
- Lightweight & Fast
- GET support (multiple parameters)
- POST support (JSON)
- Listen (port)
- Errors support (400, 422 ...)
- Standard: JSON

## Installation
```
npm install optimus-micro-node
```
or
```
yarn add optimus-micro-node
```

## Usage

```javascript
const app = require('optimus-micro-node')();
```

Define routes and controller functions:
```javascript
app.get('/', (req, res) => res.send(JSON.stringify(
  {
    "status" : "200",
    "msg": "Hello World!"
  }
)));
```

Listen:
```javascript
app.listen(port, () => console.log('Optimus micro app listening on port ' + port));
```

## Example
```javascript
const app = require('optimus-micro-node')();
const port = 3000;

app.get('/', (req, res) => res.send(JSON.stringify({"status" : "200", "msg": "Hello World!"})));
app.get('/ping', (req, res) => res.send(JSON.stringify({"status" : "200", "msg": "pong"})));
app.get('/users/:id', (req, res) => res.send(JSON.stringify({"status" : "200", "msg": "Hello user with id " + req.params.id})));
app.get('/users/:id/groups/:group', (req, res) => res.send(JSON.stringify({"status" : "200", "msg": "User id: " + req.params.id + "& Group id: " + req.params.group})));
app.post('/users/create', (req, res) => {
  console.log(req.body);
  res.send(JSON.stringify({"status" : "200", "msg": "User created."}));
});
app.listen(port, () => console.log('Optimus micro app listening on port ' + port));

```
