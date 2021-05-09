pragma solidity ^0.5.0;

contract SocialNetwork {
  string public name;
  uint public postCount = 0;

  // Solidity allows us to do s.thing called
  // mapping which stores key-value data
  mapping(uint => Post) public posts;



  // the struct will define all of the attributes
  // for the post
  struct Post {
    uint id;
    string content;
    uint tipAmount;
    address author;
  }

  event PostCreated(
    uint id,
    string content,
    uint tipAmount,
    address author
  );

  constructor() public {
    name = "dapp university social network";
  }

  // local variables have an _underscore
  // by convention, but it is not necessary
  function createPost(string memory _content) public {
    // Require valid content...this is a requirement function
    // in solidity
    /// this "bytes(_content)" code will take the content which is
    /// a string and converts it into a bytes array; this just checks
    /// the string to make sure it has some content in it before it
    /// gets created...only if require = true will
    /// the rest of the code will execute
    require(bytes(_content).length > 0);


    postCount ++;

    // create the post
    posts[postCount] = Post(postCount, _content, 0, msg.sender);

    // trigger event
    emit PostCreated(postCount, _content, 0, msg.sender);
  }
}
