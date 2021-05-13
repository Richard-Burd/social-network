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
    name = "Dapp University Social Network";
  }

  function createPost(string memory _content) public {
    // Require valid content
    require(bytes(_content).length > 0);
    // Increment the post count
    postCount ++;

    // create the post
    posts[postCount] = Post(postCount, _content, 0, msg.sender);

    // trigger event
    emit PostCreated(postCount, _content, 0, msg.sender);
  }
}
