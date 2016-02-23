// Modules
const bodyParser = require('body-parser')
const bs = require('browser-sync');
const express = require('express');
const morgan = require('morgan');
const pg = require('pg').native;
const config = require('getconfig');

const app = express();
const client = new pg.Client(config.conString);
const env = process.argv[2] || 'prod';
const port = (env == 'dev') ? 2368 : 3000;
const viewPath = '/app/';

// var pgsync = require('pg-sync');
// var client = new pgsync.Client();
     
app.set('views', __dirname + viewPath);
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/app/'));

// attaches data to url 
app.post('/submit', function(req, res) {
    var qString = 'SELECT * FROM frequency WHERE ';
    var queryArr = req.body.populations;
    var hs = req.body.hotspots;
    console.log(JSON.stringify(queryArr));
    console.log(JSON.stringify(hs));
    // var RESULT = {};

// for (var i=0; i<10; i++) {

    var dataList = [];
    var results = {};

/////////// Sync stuff 
    
    // client.connect(config.conString);
     
    // client.begin();
    // client.setIsolationLevelSerializable();
     
    // var result = client.query(queryText);

     
    // var result = client.exec(command); // returns result code only, even if the command was normal query 
     
    // var statement = client.prepare(queryText);

     
    // var queryName = "a_repeated_query";
    // var queryText = "delete from table where id=$1";
    // var statement = client.prepare(queryName,queryText);
    // [1,2,3,4].map( function(i){ statement.execute([i]); } );
     
    // client.commit();
    // client.rollback();
     
    // client.disconnect();

////////////////////

/* 
Sarah's query: 

select frequency.population, frequency.total, id.rs from frequency 
JOIN id ON frequency.rs = id.rs where frequency.rs in (select id.rs from id 
where id.chromosome = chrom and id.snploc >= start and id.snploc <= stop 
and frequency.population = ‘population’);
*/
        if (queryArr.length > 0) {
            // for (var i=0; i<hs.length; i++) {
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
                     // console.log('\nchrom:'+hs[i][0]+'\n');
                     console.log('\nhotspot:'+hs[i]);
                     console.log(qString);
                     console.log('\n\n\n');

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
                                dataList.push(row.freq / row.total); 
                            }
                            previous = pop; 
                        })

                        .on('end', function() {
                            results[previous] = dataList;
                            client.end();
                            // console.log(results);
                            return res.json(results);
                            // RESULT[hs[i]] = results;
                            // results = [];
                        });
                });
            // }
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.write('Error no somethings specified');
            res.end();
        }
    
    // client.end();
    // return res.json(RESULT);

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
