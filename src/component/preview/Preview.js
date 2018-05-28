import React from 'react';
import { connect } from 'react-redux';

import { fetchEvents, errorOccurred } from '../../redux/meetup';
import '../App.css';
import './Preview.css';

const Error = () => (
  <div className="App">
    <p className="App-intro">
      An Error occurred.
    </p>
  </div>
)

const createMarkup = (htmlContent) => ({
  __html: htmlContent
});

const Preview = ({
  groupedEvents,
  isLoading,
  hasError,
  dispatchFetchEvents,
  dispatchErrorOccurred,
}) => {
  const loader = isLoading ? <div className="loader" /> : null;
  const error = hasError ? <Error /> : null;
  const events = (!isLoading && !hasError && groupedEvents) ? <div dangerouslySetInnerHTML={createMarkup(groupedEvents)} /> : null;

  return (
    <div>
      <button onClick={() => dispatchFetchEvents('28/05/2018')}>Fetch Event</button>
      {loader}
      {error}
      {events}
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
