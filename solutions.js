WATCH OUT! DO NOT LOOK HERE UNLESS YOU ARE SURE YOU WANT TO SEE THE SOLUTION!
//=========================================================================//
WATCH OUT! DO NOT LOOK HERE UNLESS YOU ARE SURE YOU WANT TO SEE THE SOLUTION!
//=========================================================================//
WATCH OUT! DO NOT LOOK HERE UNLESS YOU ARE SURE YOU WANT TO SEE THE SOLUTION!
//=========================================================================//
WATCH OUT! DO NOT LOOK HERE UNLESS YOU ARE SURE YOU WANT TO SEE THE SOLUTION!
//=========================================================================//
WATCH OUT! DO NOT LOOK HERE UNLESS YOU ARE SURE YOU WANT TO SEE THE SOLUTION!
//=========================================================================//
WATCH OUT! DO NOT LOOK HERE UNLESS YOU ARE SURE YOU WANT TO SEE THE SOLUTION!
//=========================================================================//
WATCH OUT! DO NOT LOOK HERE UNLESS YOU ARE SURE YOU WANT TO SEE THE SOLUTION!
//=========================================================================//
WATCH OUT! DO NOT LOOK HERE UNLESS YOU ARE SURE YOU WANT TO SEE THE SOLUTION!
//=========================================================================//
WATCH OUT! DO NOT LOOK HERE UNLESS YOU ARE SURE YOU WANT TO SEE THE SOLUTION!
//=========================================================================//
WATCH OUT! DO NOT LOOK HERE UNLESS YOU ARE SURE YOU WANT TO SEE THE SOLUTION!
//=========================================================================//
WATCH OUT! DO NOT LOOK HERE UNLESS YOU ARE SURE YOU WANT TO SEE THE SOLUTION!
//=========================================================================//
WATCH OUT! DO NOT LOOK HERE UNLESS YOU ARE SURE YOU WANT TO SEE THE SOLUTION!
//=========================================================================//

function scrollToSee(timeSpent, effortInput, honor){
	if(isReasonable(timeSpent) && isValiant(effortInput) && !isRelevant(honor)){
		//Alright, scroll down to see the answers
	}
}

//Find books with fewer than 500 but more than 200 pages
//======================================================
//======================================================
//======================================================
//======================================================
Book.find(({pages:{"$lt":500, "$gt":200}}), function(err, books){
	
})








//Find books whose rating is less than 5, and sort by the author's name
//======================================================
//======================================================
//======================================================
//======================================================
Book.find({rating:{"$lt":5}}).sort({author:-1}).exec( function(err, books) {

});








//Find all the Fiction books, skip the first 2, and display only 3 of them 
//======================================================
//======================================================
//======================================================
//======================================================
Book.find({genres:"Fiction"}).skip(2).limit(3).exec(function(err, books){

});








//Find people who have at least 1 kid with grey hair
//======================================================
//======================================================
//======================================================
//======================================================
Person.find({kids:{$elemMatch:{hair:"grey"}}}).exec(function(err,people){
	
	//this is just to show you that this works
	for(p in people){
		var person = people[p];
		console.log("Person", p,"has kids:\n",person.kids);
	}
})