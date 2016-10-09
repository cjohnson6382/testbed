/*

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

//  tokenize fields and insert into index dbs

//  this only works for fields that you know are likely to have more than one word in them
//    there are text fields which definitely only have one word in them, even though they have spaces; how do they get indexed?
//      if you need to be able to search for a company name but you don't know the exact name, then you need to break down *every* text field into tokens

(ticket) => {
  const db = ;  // get the dbhandle

  //  db.collections('admin').insert({ _id: 'fieldscores', value: {} });
  //  db.collections('admin').insert({ _id: 'propmap', value: {} });
  //  db.collections('admin').insert({ _id: 'tokenfields', value: {} });
  
  //  const fieldscores = { id: 1, date: 0.5, customer: 0.8, vendor: 0.8, problem: 0.1} // etc...
  
  //  const propmap = { id: 'int', customer: 'string', date: 'date'};
  // (can store this object as JSON in the admin database, since it doesn't change)
  //    const tokenfields = {};
  //    Object.values(propmap).map((type) => {
  //      Object.defineProperty(tokenfields, type, { value: [] });
  //    });

  const propmap = db.collections['admin'].findOne({ _id: 'propmap' }).value;
  const tokenfields = db.collections['admin'].findOne({ _id: 'tokenfields' }).value
  
  Object.keys(ticket).map((field) => {



    // regex match all the \w+ fields in ticket.field, return them as an array of insert objects; currently it's a 'split()'
    
    
    let insertObjects = ticket[field].split().map((token) => {
      return { token: token, field: field, id: ticket.id};
    });
    //  can just do the DB insertion here.. why waste my time with another .map?
    db.collections(propmap[field]).insertMany(insertObjects);
  });
}

how do I deal with updates?
* get the original ticket from the ticketdb
* delete all tokens from the relevant index dbs that are in fields changed by the update

      //  const propmap = { id: 'int', customer: 'string', date: 'date'};
      const propmap = collections['admin'].find(_id: 'propmap');
      
      
      Object.keys(update).map((prop) => {
        //  prop = 'name', 'id', 'customer', etc.
        collection[propmap[prop]].deleteMany(
          { $and [ type: prop }, { id: update.id } ] }
        )
      })

      
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

//  npm install mongodb --save

//  mongodb --dbpath=/data

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



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



const url = "mongodb://localhost:27017/rmatickets";

MongoClient.connect(url, function (err, db) {
  assert.equal(null, err);
  console.log("successfully connected to the rmatickets database");
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

//  create an index on ID
indexTicketdb = (db, callback) => {
  db.collection('tickets').createIndex(
    //  creates a descending index -- highest id is first in the index
    { id: -1 },
    null,
    (err, res) => {
      console.log(results);
      callback();
    }
  );
};

// create an index on the name field
indexTicketdb = (db, callback) => {
  db.collection('tickets').createIndex(
    { name: "text" },
    null,
    (err, res) => {
      console.log(results);
      callback();
    }
  );
};

//  search using the name field's 'text' index
db.tickets.find({ $text: { $search: 'companyname' } }).toArray((err, docs) => {
  assert.equal(err, null);
  callback();
});
