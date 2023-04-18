import React from 'react';
import Question from './question';
import title from './images/title.png'
import './index.less';

const IndexPage: React.FC = () => {

  return (
    <div className="app-root">
      <div className="title">
        <img className="title-picture" src={title} />
      </div>
      <Question />
    </div>
  );
};

export default IndexPage;
