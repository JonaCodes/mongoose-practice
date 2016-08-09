/*=====================================================
Setup crap
=======================================================*/
var bodyParser = require('body-parser')
var express = require('express')
var app = express()

var request = require('request')
var mongoose = require('mongoose')
var Book = require("./models/BookModel")
var Person = require("./models/PersonModel")

mongoose.connect("mongodb://localhost/classbook")
//mongoose.connect("mongodb://localhost/classperson")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
/*=====================================================
=======================================================*/
//app.use("/node_modules", express.static(__dirname + '/node_modules'))

/*=====================================================
Create books DB
=======================================================*/
var isbns = [9780156012195, 9780743273565, 9780435905484, 9780140275360, 9780756404741, 9780756407919, 9780140177398, 9780316769488, 9780062225672, 9780143130154, 9780307455925, 9781501143519 ]
var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:"

for(i in isbns){
	var apiURL = url + isbns[i]
	//loadFromAPI(apiURL)
}

function loadFromAPI(apiURL){

	request(apiURL, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var resBook = JSON.parse(body).items[0].volumeInfo

	    var book = new Book({
		    title:resBook.title,
		    author:resBook.authors[0],
		    pages:resBook.pageCount,
		    genres:resBook.categories || ["Other"],
		    rating:resBook.averageRating || 5
	    })

	    //Only save if the book doesn't exist yet
	    Book.findOne({title:book.title}, function(err, foundBook){
	    	if(!foundBook){
	    		book.save()
	    	}
	    })
	  }
	})
}
/*=====================================================
=======================================================*/

/*=====================================================
Create People DB
=======================================================*/
var colors = ["brown","black","red","yellow","green", "grey"]
var getColor = function(){return colors[Math.floor(Math.random() * colors.length)]}
var getWeight = function(){return Math.floor(Math.random()*(150-50+1)+50);}
var getHeight = function(){return Math.floor(Math.random()*(230-120+1)+120);}
var getSalary = function(){return Math.floor(Math.random()*(500000-20000+1)+20000);}
var getNumKids = function(){return Math.floor(Math.random()*5)}

var getKids = function(numKids){
	var kids = [];
	for(var i = 0; i < numKids; i++){
		kids.push({
			hair: getColor(),
			eyes: getColor(),
			weight: getWeight(),
			height: getHeight(),
		})
	}
	return kids;
}

for(var i = 0; i < 100; i++){
	var numKids = getNumKids();
	var p  = new Person({
		hair: getColor(),
		eyes: getColor(),
		weight: getWeight(),
		height: getHeight(),
		salary: getSalary(),
		numKids: numKids,
		kids: getKids(numKids)
	})

	//p.save()
}
/*=====================================================
=======================================================*/

/*=====================================================
Exercises
=======================================================*/

//Books

//Find books with fewer than 500 but more than 200 pages
Book.find(({pages:{"$lt":500, "$gt":200}}), function(err, books){
	//console.log("found:\n",books);
})

//Find books whose rating is less than 5, and sort by the author's name
Book.find({rating:{"$lt":5}}).sort({author:-1}).exec( function(err, books) {
	//console.log(books);
});

//Find all the Fiction books, skip the first 2, and display only 3 of them 
Book.find({genres:"Fiction"}).skip(2).limit(3).exec(function(err, books){
	console.log(books);
});


//People
//Find people who have at least 1 kid with grey hair
/*Person.find({kids:{$elemMatch:{hair:"grey"}}}).exec(function(err,people){
	for(p in people){
		var person = people[p];
		console.log("Person", p,"has kids:\n",person.kids);
	}
})*/

/*=====================================================
=======================================================*/

console.log("Server up and running ~")
app.listen(1337)