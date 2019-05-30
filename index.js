const http = require('http');

const optimus = (() => {
  let routes = [];

  const addRoute = (method, url, ctrl) => {
    routes.push({ method, url, ctrl });
  };

  const findRoute = (method, url) => {
    let params = {}; 
    let routeFound = null; 
    
    for (let index = 0; index < routes.length; index++ ) {
      if(!!routeFound) {
        break;
      }

      let routeParts = routes[index].url.replace(/^\/|\/$/g, '').split('/');
      let urlParts = url.replace(/^\/|\/$/g, '').split('/');

      params = {};
      routeFound = null;
      
      if(routeParts.length == urlParts.length && method === routes[index].method) {
        for (let partIndex = 0; partIndex < routeParts.length; partIndex++ ) {
	  if(routeParts[partIndex].startsWith(':')) {
            let param = routeParts[partIndex].replace(/^:/g, '');
    	    params[param] = urlParts[partIndex];
	  } else if(!routeParts[partIndex].startsWith(':') && routeParts[partIndex] === urlParts[partIndex]) {
	    routeFound = routes[index];
	  } else {
	    break;  
	  }
	}
      }
    }
    if(!!routeFound) {
      routeFound.params = params;
    }
    return routeFound;
  };

  const get = (route, ctrl) => addRoute('get', route, ctrl);
  const post = (route, ctrl) => addRoute('post', route, ctrl);

  const router = () => {
    const listen = (port, callback) => {
      http.createServer((req, res) => {
        const method = req.method.toLowerCase();
        const url = req.url.toLowerCase();
        const found = findRoute(method, url);
        
        if (found) {
          req.params = found.params;
	  let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
	  
          req.on('end', () => {
            if(method === 'post') {
	      try {
                req.body = JSON.parse(body);
	      } catch (e) {
                res.writeHead(422, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                  "status": "422",
                  "msg": "Hey you, I need JSON!"
                }));
	      }
	    }
            res.send = content => {
              res.writeHead(200, { "Content-Type": "text/plain" });
              res.end(content);
            };
            return found.ctrl(req, res);
  	  });
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            "status": "404",
            "msg": "Not Found"
          }));
	}
      }).listen(port, callback);
    };

    return {
      get,
      post,
      listen
    };
  };

  return router;
})();

module.exports = optimus;
