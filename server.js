const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();




MongoClient.connect('mongodb+srv://blawblawLaw:PSleW8lZcEXRLvjX@cluster0.lohil.mongodb.net/learnOrPayCards?retryWrites=true&w=majority', {
  useUnifiedTopology: true })
    .then(client => {
      console.log('Connected to Database')
      const db = client.db('userCards')
      const cardsCollection = db.collection('cards')

      app.set('view engine', 'ejs')

      app.use(bodyParser.urlencoded({ extended: true }));
      app.get('/', (req, res) => {
        db.collection('cards').find().toArray()
          .then(results => {
            res.render('index.ejs', { quotes: results })
          })
          .catch(error => console.error(error))

        //const cursor = db.collection('quote').find()
        //console.log(cursor)
        //res.sendFile('/Users/charleslaw/src/learnOrPay/index.html')
      });
      app.post('/cards', (req,res) => {
        cardsCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })
      app.listen(3000, function() {
        console.log('listening on 3000')
      });
    })
    .catch(error => console.error(error))
