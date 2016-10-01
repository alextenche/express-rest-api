'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sandbox');

var db = mongoose.connection;

db.on('error', function(err){
  console.error('connection error:', err);
});

db.once('open', function(){
  console.log('db connection succesfull');

  var Schema = mongoose.Schema;
  var AnimalsSchema = new Schema({
    type: { type: String, default: 'goldfish' },
    size: String,
    color: { type: String, default: 'golden' },
    mass: { type: Number, default: 0.007 },
    name: { type: String, default: 'Nemo' },
  });

  AnimalsSchema.pre('save', function(next){
    if (this.mass >= 100) {
      this.size = 'big';
    } else if (this.mass >= 5 && this.mass < 100) {
      this.size = 'medium';
    } else {
      this.size = 'small';
    }
    next();
  });

  AnimalsSchema.statics.findSize = function(size, callback){
    return this.find({size: size}, callback);
  }

  AnimalsSchema.methods.findSameColor = function(callback){
    return this.model('Animal').find({color: this.color}, callback);
  }

  var Animal = mongoose.model('Animal', AnimalsSchema);

  var elephant = new Animal({
    type: 'elephant',
    color: 'gray',
    mass: 6000,
    name: 'Alex'
  });

  var animal = new Animal({});

  var whale = new Animal({
    type: 'whale',
    mass: 16000,
    name: 'Moby Dark'
  });

  var animalData = [
    {
      type: "mouse",
      color: "gray",
      mass: 0.035,
      name: "Mickey"
    },
    {
      type: "nutria",
      color: "brown",
      mass: 6.35,
      name: "Regina"
    },
    {
      type: "wolf",
      color: "gray",
      mass: 35,
      name: "DonJonson"
    },
    elephant,
    animal,
    whale

  ];

  Animal.remove({}, function(err){
    if (err) console.error('save failed', err);
    Animal.create(animalData, function(err, animals){
      if (err) console.error('save failed', err);
      Animal.findOne({type: 'elephant'}, function(err, elephant){
        elephant.findSameColor(function(err, animals){
          if (err) console.error('save failed', err);
          animals.forEach(function(animal){
            console.log(animal.name + ' the ' + animal.color + ' ' + animal.type + ' is a ' + animal.size + '-sized animal');
          });
          console.log('saved');
          db.close(function(){
            console.log('db connection closed');
          });
        });
      });
    });
  });


});
