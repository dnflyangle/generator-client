import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { fetchEvents, errorOccurred } from '../../redux/meetup';
import '../App.css';
import './Preview.css';
import 'react-datepicker/dist/react-datepicker.css';

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

class Preview extends Component {

  state = {
    startDate: moment(),
  }

  render() {
    const { groupedEvents,
      isLoading,
      hasError,
      dispatchFetchEvents,
      dispatchErrorOccurred,
    } = this.props;
    const loader = isLoading ? <div className="loader" /> : null;
    const error = hasError ? <Error /> : null;
    const events = (!isLoading && !hasError && groupedEvents) ? <div dangerouslySetInnerHTML={createMarkup(groupedEvents)} /> : null;

    return (
      <div>
        <DatePicker
          selected={this.state.startDate}
          onChange={date => {
            console.log(date);
            this.setState({ startDate: date });
          }}
        />
        <button onClick={() => dispatchFetchEvents(this.state.startDate)}>Fetch Event</button>
        {loader}
        {error}
        {events}
      </div>
    )
  }
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
