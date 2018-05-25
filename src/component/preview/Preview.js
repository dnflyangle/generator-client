import React from 'react';
import ejs from 'ejs';
import fs from 'fs';
import { connect } from 'react-redux';

import { fetchEvents, errorOccurred } from '../../redux/meetup';
import '../App.css';

const Error = () => (
  <div className="App">
    <p className="App-intro">
      An Error occurred.
    </p>
  </div>
)

const formatEvents = (groupedEvents, dispatchErrorOccurred) => {
  try {
    const data = fs.readFileSync(`${__dirname}/emailTemplate.ejs`, 'utf8');
    const template = ejs.compile(data);
    return template({ groupedEvents });
  } catch (err) {
    console.log(err);
    dispatchErrorOccurred();
  }
}

const Preview = ({
  groupedEvents,
  isLoading,
  hasError,
  dispatchFetchEvents,
  dispatchErrorOccurred,
}) => {
  const loader = isLoading ? <div className="loader"/>: null;
  const error = hasError ? <Error /> : null;
  const events = (!isLoading && !hasError && groupedEvents) ? formatEvents(groupedEvents, dispatchErrorOccurred) : null;

  return (
    <div>
      <button onClick={() => dispatchFetchEvents('28/05/2018')}>Fetch Event</button>
      {loader}
      {error}
      {console.log(events)}
    </div>
  )
}

const mapStateToProps = state => ({
  isLoading: state.meetup.isLoading,
  hasError: state.meetup.hasError,
  groupedEvents: state.meetup.groupedEvents,
})

const mapDispatchToProps = dispatch => ({
  dispatchFetchEvents: date => dispatch(fetchEvents(date)),
  dispatchErrorOccurred: () => dispatch(errorOccurred()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
