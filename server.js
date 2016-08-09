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

mongoose.connect("mongodb://localhost/mongooseexs")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
/*=====================================================
=======================================================*/

/*=====================================================
Create books Collection
=======================================================*/
var isbns = [9780156012195, 9780743273565, 9780435905484, 9780140275360, 9780756404741, 9780756407919, 9780140177398, 9780316769488, 9780062225672, 9780143130154, 9780307455925, 9781501143519 ]
var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:"

for(i in isbns){
	var apiURL = url + isbns[i]
	loadFromAPI(apiURL)	//really, you should only run this once. that said, there's a failsafe to avoid duplicates below
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
Create People Collection
=======================================================*/
var colors = ["brown","black","red","yellow","green", "grey"]
var getColor = function(){return colors[Math.floor(Math.random() * colors.length)]}
var getWeight = function(){return Math.floor(Math.random()*(150-50+1)+50);}
var getHeight = function(){return Math.floor(Math.random()*(230-120+1)+120);}
var getSalary = function(){return Math.floor(Math.random()*(500000-20000+1)+20000);}
var getNumKids = function(){return Math.floor(Math.random()*3)}

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

Person.find({}).count(function(err, count){
	
	if(count < 100){
		for(var i = 0; i < 100 - count; i++){
			
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

			p.save()
		}
	}
})
/*=====================================================
=======================================================*/

/*=====================================================
Exercises
=======================================================*/
/*Books
----------------------*/
//1. Find books with fewer than 500 but more than 200 pages

//2. Find books whose rating is less than 5, and sort by the author's name

//3. Find all the Fiction books, skip the first 2, and display only 3 of them 

/*People
----------------------*/
//1. Find people who have at least 1 kid with grey hair

/*=====================================================
=======================================================*/

console.log("Server up and running ~")
app.listen(1337)