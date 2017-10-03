import React from 'react';

const NewsItem = props => (
  <div className="news">
    <div className="title"><a href={props.article.url} target="_blank">{props.article.title}</a></div>
    <div className="date">{(new Date(props.article.published_at)).toString()}</div>
    <div className="source">{props.article.source.title}</div>
  </div>
);

export default NewsItem;
