// Modules
const bs = require('browser-sync');
const express = require('express');
const morgan = require('morgan');

const app = express();
const env = process.argv[2] || 'prod';
const port = (env == 'dev') ? 2368 : 3000;
const viewPath = '/app'

app.set('views', __dirname + viewPath);
app.use(morgan('combined'));
app.use(express.static(__dirname + '/app/'));

app.get('*', function(req, res) {
    res.sendFile(viewPath + 'index.html');
});

app.put('/submit', function(req, res) {
   console.log(res);
});

app.listen(port, function() {
    if (env == 'dev') {
        bs({
            file: ['app/js/*.js'],
            open: false,
            proxy: 'localhost:' + port
        });
        console.log('Listening on port 2368 w/ browser-sync');
    } else {
        console.log('Listening on port ' + port);
    }
});
