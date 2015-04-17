var vote    = require('./vote');
var seats   = vote.seats;
var ballots = vote.ballots;

var count = ( function ( ticket ) {
  var self = new Object();
  for( var i = 0; i < ticket.length; i++ ) {
    self[ ticket[i] ] = 0;
  }
  return self;
} )( vote.ticket );

var newQuota = function ( votes, seats ) {
  return Math.floor( (votes / (seats + 1)) + 1 );
};

var newCount = function ( count, ballots ) {
  for( var candidate in count ) {
    count[candidate] = 0;
  }
  for( var i = 0; i < ballots.length; i++ ) {
    var preference = ballots[i][0];
    count[preference]++;
  }
  console.log( "Current count:", count );
};

var declareWinners = function ( count, quota ) {
  var winners = new Array();
  for ( candidate in count ) {
    if ( count[candidate] >= quota ) {
      winners.push( candidate );
    }
  }
  return winners;
};

var pruneCount = function ( ballots, count ) {

  // Find minimum number of votes any candidate got
  var min = Infinity;
  for( var candidate in count ) {
    min = Math.min( min, count[candidate] );
  }

  // Find all candidates who got the minimum
  var losers = [];
  for( var candidate in count ) {
    if( count[candidate] === min ) {
      losers.push( candidate );
    }
  }

  // Pick a random loser
  var loser = losers[ Math.floor( Math.random() * losers.length ) ];
  console.log( "Eliminating " + loser );

  // Remove loser from ballots and remove empty ballots
  var i = 0;
  while( i < ballots.length ){
    var ballot = ballots[i];
    var remove = ballot.indexOf( loser );
    if ( remove > -1 ) {
      ballot.splice( remove, 1 );
    }
    if ( ballot.length === 0 ) {
      ballots.splice( i, 1 );
    } else { i++; }
  }

  // Remove loser from count
  delete count[loser];

};

var runRound = function ( ballots, quota, count ) {
  newCount( count, ballots );
  return declareWinners( count, quota );
};

var runAll = function ( seats, ballots, count ) {
  var quota = newQuota( ballots.length, seats );
  var winners = runRound( ballots, quota, count );
  if ( winners.length === seats ) { return winners; }
  pruneCount( ballots, count );
  return runAll( seats, ballots, count);
};

var winners = runAll( seats, ballots, count);
for ( var i = 0; i < seats; i++ ) {
  console.log( "Winner: " + winners[i] );
}