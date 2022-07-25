//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract SendMeme 
{
    struct Meme 
    {
        uint ID;
        string Images;
        address ownerAddress;
        string LikeCount;
        string Title;
        string Date;
        string Tag;
    }

    struct Comment 
    {
        uint ID;
        uint MemeID;
        address ownerAddress;
        address userAddress;
        string Date;
        string Comment;
    }

    struct Vote
    {
        uint ID;
        uint MemeID;
        address ownerAddress;
        address userAddress;
        bool userVote;
    }

    Meme[] public memes;
    Comment[] public comments;
    Vote[] public votes;

    function getMemes() view public returns(Meme[] memory) 
    {
        return memes;
    } 

    function getComments() view public returns(Comment[] memory) 
    {
        return comments;
    } 

    function getVotes() view public returns(Vote[] memory) 
    {
        return votes;
    }

    function createMeme(
        string memory _images,
        string memory _title,
        string memory _date,
        string memory _tag
    ) public payable 
    {
        require(msg.value == 1000000000000000 wei);
        Meme memory file;

        file.ownerAddress = msg.sender;
        file.ID = memes.length;
        file.Images = _images;
        file.Title = _title;
        file.Date = _date;
        file.Tag = _tag;
        file.LikeCount = "0";

        memes.push(file);
    }

    function sendComment(
        uint _memesId,
        string memory _comment,
        string memory _date,
        address _ownerAddress
    ) public 
    {
        Comment memory comment;

        comment.ID = comments.length;
        comment.MemeID = _memesId;
        comment.ownerAddress = _ownerAddress;
        comment.Date = _date;
        comment.userAddress = msg.sender;
        comment.Comment = _comment;

        comments.push(comment);
    }

    function sendVote(
        uint _memesId,
        bool _vote,
        address _ownerAddress
    ) public 
    {
        Vote memory vote;

        vote.ID = votes.length;
        vote.MemeID = _memesId;
        vote.ownerAddress = _ownerAddress;
        vote.userAddress = msg.sender;
        vote.userVote = _vote;

        votes.push(vote);
    }

    function SendMoneyToWinner(address payable _to) external 
    {
        _to.transfer(address(this).balance);
    }

    function balanceOf() external view returns(uint) 
    {
        return address(this).balance;
    }
}
