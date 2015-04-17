var ticket = [
    "Alice"
  , "Bob"
  , "Charlie"
  , "Dave"
];

var ballots = [
  [ "Alice", "Bob", "Charlie" ],
  [ "Bob", "Charlie", "Dave", "Alice" ],
  [ "Charlie", "Bob" ],
  [ "Alice", "Dave", "Bob", "Charlie" ],
  [ "Alice", "Charlie", "Bob" ],
  [ "Bob", "Alice", "Charlie" ],
  [ "Dave" ],
  [ "Charlie", "Alice", "Dave" ]
];

module.exports = (function() {
  return { 
      seats   : 2
    , ticket  : ticket
    , ballots : ballots
  };
})();
