// Modules
const bodyParser = require('body-parser')
const bs = require('browser-sync');
const express = require('express');
const morgan = require('morgan');
const pg = require('pg').native;

const app = express();
const conString = 'postgres://jwxlciuytoiaom:V6CyTfP-tjMhYikxHl-tHWPBUk@ec2-54-235-162-144.compute-1.amazonaws.com:5432/d50gmpmgt0p5b9';
const client = new pg.Client(conString);
const env = process.argv[2] || 'prod';
const port = (env == 'dev') ? 2368 : 3000;
const viewPath = '/app/';

app.set('views', __dirname + viewPath);
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/app/'));

// attaches data to url 
app.post('/submit', function(req, res) {
    var qString = 'SELECT * FROM frequency WHERE ';
    var queryArr = req.body;
    var dataList = [];
    var results = {};

    if (queryArr.length > 0) {
        previous = queryArr[0];
         client.connect(function(err) {
             if (err) {
                 return console.error('unable to connect to postgres', err);
             }
             for (var i = 0; i < queryArr.length; i++) {
                 qString += "population='" + queryArr[i] +"'";
                 if (i < queryArr.length - 1) {
                     qString += ' or ';
                 }
             }

             qString += ' order by population, rs'

             client.query(qString, function(err, result) {
                 if (err) {
                     return console.error('error running query', err);
                 }

             })
                .on('row', function(row) {
                    pop = row.population;
                    if (pop != previous){
                        results[previous] = dataList;
                        dataList = [];

                    } else {
                        dataList.push(row.sum);
                    }
                    previous = pop; 
                })

                .on('end', function() {
                    results[previous] = dataList;
                    client.end();
                    return res.json(results);
                });
        });
    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.write('Error no somethings specified');
        res.end();
    }
});

app.get('*', function(req, res) {
    res.sendFile(viewPath + 'index.html');
});

// turning server on
app.listen(port, function() {
    if (env == 'dev') {
        bs({
            file: ['app/js/*.js', 'app/index.html'],
            open: false,
            proxy: 'localhost:' + port
        });
        console.log('Listening on port 2368 w/ browser-sync');
    } else {
        console.log('Listening on port ' + port);
    }
});
