import React from 'react';
import ejs from 'ejs';
import fs from 'fs';

import logger from '../../utils/logger';

const Preview = (groupedEvents) => {
  try {
    const data = fs.readFileSync(`${__dirname}/emailTemplate.ejs`, 'utf8');
    const template = ejs.compile(data);
    return template({ groupedEvents });
  } catch (err) {
    logger.error('unable to template events, with err: ', err);
    return (
      <div className="App">
        <p className="App-intro">
          An Error occurred.
        </p>
      </div>
    )
  }
}

export default Preview;
