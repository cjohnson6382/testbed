/*

/// note that MongoDb stores date information on the _id key:
> db.penguins.find().forEach(function (doc){ d = doc._id.getTimestamp(); print(d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()) })
2014-12-23 3:4:41
2014-12-23 3:4:53


search engine for the backend:

3 different databases, one for each type of data that can be stored in the ticketDB
* each database:
  - index will be on a token field for each object; the rest of the object will have:
      * id of the ticket that it came from,
      * field type (customer, type, problem, whatever -- fields will be assigned a score)
      * should also have a multiplier in case the token appears multiple times in the field

when you search, the server route will tokenize the search and determine which type each field is
* separate each token, by type, into arrays
* query the index databases with each token and get back an array of hits
  - each hit has a score on it already
  - add the scores up
  
return the top 25 hits to the client, sorted by: score, date

put an index on the token's field name, id too for easy deletion


//  search using the name field's 'text' index
db.tickets.find({ $text: { $search: 'companyname' } }).toArray((err, docs) => {
  assert.equal(err, null);
  callback();
});


co(function *() {
  let hasAdminObjects = yield db.collections('admin').findOne({ _id: 'fieldscores' });
  if (!hasAdminObjects) yield createAdminObjects;

  yield createIndexes();
});


const createAdminObjects = () => {
  const fieldscores = { id: 1, date: 0.5, customer: 0.8, vendor: 0.8, problem: 0.1} // etc...
  const propmap = { id: 'int', customer: 'string', date: 'date'};
  const tokenfields = {};
  
  Object.values(propmap).map((type) => {
    Object.defineProperty(tokenfields, type, { value: [] });
  });

  db.collections('admin').insert({ _id: 'fieldscores', value: fieldscores });
  db.collections('admin').insert({ _id: 'propmap', value: propmap });
  db.collections('admin').insert({ _id: 'tokenfields', value: tokenfields });
  
  return;
};

const createIndexes = () => {
  //  indexes seem to be able to work well on any field in the standard 'ticketdb'; remove all the non-ticket databases!

  db.tickets.createIndex({ id: -1 }, null, (err, res) => { console.log(res) }));
  db.tickets.createIndex({ date: -1 }, null, (err, res) => { console.log(res) }));
  db.tickets.createIndex(
    { "$**": "text" },
    {
      name: "TextIndex",
      /////////////////////////////// finish filling this out //////////////////////////////////
      weights: {
        _id: 10
        customer: 9
        vendor: 9
        problem: 2
      }
    },
    (err, res) => { console.log(res) }
  );
  
  
//  db.int.createIndex({ id: -1 }, null, (err, res) => { console.log(results) });
//  db.date.createIndex({ date: -1 }, null, (err, res) => { console.log(results) });
//  db.text.createIndex({ string: "text" }, null, (err, res) => { console.log(results) });
  
};

app.use((req, res, next) => {
  //  npm install mongodb --save
  //  mongodb --dbpath=/data
  
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
  const co = require('co');
  
  co(function *() {
    const url = "mongodb://localhost:27017/rmatickets";
    const db = yield MongoClient.connect(url);
    
    req.db.dbhandle = db;

    yield req.db.dbobjects.tokenfields = req.db.dbhandle.collections['admin'].findOne({ _id: 'tokenfields' }).value;
    yield req.db.dbobjects.tokenfields = req.db.dbhandle.collections['admin'].findOne({ _id: 'tokenfields' }).value;
    yield req.db.dbobjects.tokenfields = req.db.dbhandle.collections['admin'].findOne({ _id: 'tokenfields' }).value;
    
    next();
  })
    .catch((err) => {
      console.log(err.stack);
    });
});


app.use('/api/new', () => {
  addToIndex(req.body.ticket);
});

app.use('/api/update', () => {
  updateIndex(req.body.ticket);
});

updateIndex = () => {
  deleteFromIndex();
  addToIndex();
};

  const db = req.db.dbhandle
  
  //  scores for each field { id: 1.0, customer: 0.9 }
  const fieldscores = req.db.dbobjects.fieldscores;

  //  ticket properties are int, text, date, whatever -- to determine what indexdb they should be stored in
  const propmap = req.db.dbobjects.propmap;
  
  //  has all the props that need to be stored for each token { tokenvalue ('dog', '13', 'California', etc.), tokentype (int, date, string), parentticketid
  //    (use to tell which ticket a token belongs to)}
  const tokenfields = req.db.dbobjects.tokenfields;



//  takes a new/updated ticket, breaks it into tokens, inserts those tokens into the appropriate indexdb
addToIndex = (ticket) => {
  const db = req.db.dbhandle
  const propmap = req.db.dbobjects.propmap;
  
  Object.keys(ticket).map((field) => {
    let insertObjects = ticket[field].match(/\w+/).map((token) => {
      return { token: token, field: field, id: ticket.id};
    });

    db.collections(propmap[field]).insertMany(insertObjects);
  });
};

deleteFromIndex: () => {
  const db = req.db.dbhandle
  const propmap = req.db.dbobjects.propmap;

  const propmap = collections['admin'].find(_id: 'propmap');
  
  Object.keys(update).map((prop) => {
    collection[propmap[prop]].deleteMany(
      { $and [ type: prop }, { id: update.id } ] }
    )
  })
  
}


//  once you get back an array of results from the DB, need to figure out the top 25 scoring results to return to the client
sumScores: function (db_results_array) {
  let scores_object = {};

  db_results_array.map((result) => { scores[result] ? scores_object[result] += result.score : scores_object[result] = result.score });
  let scores_array = Object.keys(scores_object).map((result) => { return [result, scores[result]] });
  let ordered_values = scores_array.sort((a, b) => { return a[1] - b[1] );
  let truncated_ordered_values = ordered_values.length > 24 ? ordered_values.slice(0, 25) : ordered_values.slice(0);

  //  return array of strings; string = short form ticket for display in TicketList
  return truncated_ordered_values.map((value) => { return value[0] });
}



*/

/*

the front page of the site will have a search bar that controls what's displayed in the ticketlist box
  the search bar is going to start by searching for the name of the customer and results will be sorted by recency
  
the ticket modals are going to have autocomplete fields that will fetch data from the database

the tickets will have to be searchable by basically any field they have

the customer/vendor databases are only searchable by name columns
  going to start by just putting names into the customer/vendor databases
  also going to start by having an existing list of contents; assuming that the vendors/customers come from somewhere else and aren't created
    directly from the rmaticket modal
    
step one: nodejs connects to the database
step two: middleware that get handles to each of the three different collections and put them on the request object
step three: another(?) middleware that creates the functions necessary for CRUDing the different collections

  all tickets are in JSON; all vendors and customers are just strings but will eventually be objects; should make them objects from the outset

  tickets database:
    * create ticket: only takes a complete ticket object but then validates it and inserts it directly into the DB
    * delete ticket: takes a ticket id and deletes by that id
    * update ticket: takes a partial ticket object, that includes a ticketid, and updates by ticketid (which is a UNIQUE column)
    * get tickets: takes a search string that it uses to get a filtered list of tickets, which it returns to the client for the ticketlist
    
  vendors and customers databases:
    * get vendors: takesa  search string that it uses to get a filtered list of vendors, which the client uses for its autocompletes
*/

app.get('/api/:database/get/:query', (req, res) => {
  let collection = req.db[req.params.database];
  let query = req.params.query;

  collection.find({ $text: { $search: query } }).toArray((err, docs) => {
    assert.equal(err, null);
    res.end(docs);
  });
});

app.post('/api/tickets/create', (req, res) => {
  let collection = req.db.tickets;
  let query = req.body.ticket;
  
  collection.insertOne(ticket, (err, data) => {
    assert.equal(err, null);
    res.end('ticket inserted successfully: ', data);
  });
});

app.post('/api/tickets/update', (req, res) => {
  let collection = req.db.tickets;
  let query = req.body.ticket;
  
  collection.updateOne({ id: query.id }, { $set: query }, (err, data) => {
    assert.equal(err, null);
    res.end('ticket updated successfully: ', data);
  });
});

app.post('/api/tickets/delete', (req, res) => {
  let collection = req.db.tickets;
  let query = req.body.ticket;
  
  collection.deleteOne( { id: query.id }, (err, data) => {
    assert.equal(err, null);
    res.end('ticket deleted successfully', data);
  });
});

app.get('/api/tickets/get/:query', (req, res) => {
  let collection = req.db.tickets;
  let query = req.params.query;

  //  split by or/and conditions first
  let regex = /\|\||&&/;
  let tokens = query.split(regex);
  let queries = {};
  tokens.map((token) => {
    let clause = token.replace(" ", "").split(':');
    queries[[query[0]]] = { $regex: query[1] };
  });

  
  //  takes a string of name: regex expressions joined with conditionals: 'id: /20/ && customer: /texas/ || vendor: /bear/'
  //    string is evaluated from left to right in the order the user writes it
  
  //  this is kind of stupid; there's probably a library that does this just fine...
  collection.find(queries).toArray((err, docs) => {
    assert.equal(err, null);
    res.end(docs);
  });
});




/*
The insert command returns an object with the following fields:

result Contains the result document from MongoDB
ops Contains the documents inserted with added _id fields
connection Contains the connection used to perform the insert
*/
let ticket = {};
const insertTicket = (db, callback) => {
  let ticketdb = db.collection('tickets');
  ticketdb.insertOne(ticket, (err, res) => {
    assert.equal(err, null);
    assert.equal(3, res.result.id);
  });
};

const findTickets = (db, callback) => {
  let ticketdb = db.collection('tickets');
  ticketdb.find({}).toArray((err, docs) => {
    asssert.equal(err, null);
    callback(docs);
  });
};

ticketdb.find({ 'id': 3 }).toArray((err, docs) => {
  assert.equal(err, null);
  callback(docs);
});

ticketdb.updateOne({ 'id': 3}, { $set: { 'customer': 'Texas'} }, (err, res) => {
  assert.equal(err, null);
});

ticketdb.deleteOne({ 'id': 3 }, (err, res) => {
  assert.equal(err, null);
});


