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

  constructor() public {
    name = "dapp university social network";
  }

  // local variables have an _underscore
  // by convention, but it is not necessary
  function createPost(string memory _content) public {
    postCount ++;
    posts[postCount] = Post(postCount, _content, 0, msg.sender);
  }
}
