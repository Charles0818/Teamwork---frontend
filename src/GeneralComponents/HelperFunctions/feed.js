import { stringifyDate } from './date';
import React, { useContext } from 'react';
import { FeedContext } from '../context/feedContext';
import Content from '../../ClientSide/MainContent/NewsFeed/Content.component';
import { displayIfEmpty } from '../displayMessage/displayIfEmpty';
export const assignProperties = (content, comments, flags) => {
  const commentArr = comments.map(comment => {
    comment.createdon = stringifyDate(comment.createdon);
    comment.id = parseInt(comment.id, 10);
    return comment
  });
  const feed = content.map(feed => {
    const filterComments = commentArr.filter(comment => comment.contentid === parseInt(feed.id, 10));
    console.log(filterComments);
    const flagStat = flags.filter(flag => flag.contentid === feed.id);
    const { createdon } = feed;
    feed.comments = filterComments;
    feed.createdon = stringifyDate(createdon);
    feed.id = parseInt(feed.id, 10);
    feed.flagStat = flagStat
    return feed
  })
  return feed
}

export const assignPropsToOneFeed = (content, comments, flagStats) => {
  const commentArr = comments.map(comment => {
    comment.createdon = stringifyDate(comment.createdon);
    comment.id = parseInt(comment.id, 10);
    return comment;
  })
  content.comments = commentArr;
  content.flagStats = flagStats;
  content.createdon = stringifyDate(content.createdon);
  content.id = parseInt(content.id, 10);
  return content;
}

export const assignPropsToNewFeed = (feed) => {
  feed.createdon = stringifyDate(feed.createdon);
  feed.id = parseInt(feed.id, 10);
  feed.comments = [];
  feed.flagStats = [];
  return feed
};

export const useFeedContext = (action) => {
  const { feed, updateFeed } = useContext(FeedContext);
  console.log(feed);
  switch(action) {
    case 'add' :
      const addComment = (contentId, comment) => {
        console.log(comment);
        comment.createdon = stringifyDate(comment.createdon);
        const updatedFeed = feed.map(el => {
          if (el.id === contentId) {
            el.comments = [...el.comments, comment];
          }
          return el
        });
        updateFeed(updatedFeed)
      };
      return { addComment }
    case 'delete':
      const deleteComment = (contentId, commentId) => {
        const updatedFeed = feed.map(el => {
          if(el.id === contentId) {
            el.comments = el.comments.filter(comment => comment.id !== commentId)
          }
          return el;
        });
        updateFeed(updatedFeed)
      };
      return { deleteComment }
    case 'edit':
      const modifyComment = (contentId, commentId, commentObj) => {
        console.log(commentObj)
        commentId = parseInt(commentId, 10);
        const updatedFeed = feed.map(el => {
          if(el.id === contentId) {
            el.comments = el.comments.map(comment => {
              if(comment.id === commentId) {
                commentObj.createdon = stringifyDate(commentObj.createdon)
                commentObj.id = parseInt(commentObj.id, 10);
                comment = commentObj;
              };
              return comment;
            })
          }
          return el;
        });
        updateFeed(updatedFeed)
      };
      return { modifyComment }
    default :
      break;
  }
}

export const renderFeed = (feed, userData) => {
  const { userId, token } = userData;
  if (feed.length !== 0) {
    return feed.map((feed, index) => <Content key={index} feed={feed} userData={{ userId, token }}/>)
  }
  else return displayIfEmpty("No Content")
};

export const checkIfUserFlagged = (flagStats, userId) => {
  return flagStats.find(arr => parseInt(arr.userid, 10) === userId);
}