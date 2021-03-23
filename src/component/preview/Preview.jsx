import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';
import {
  Button, Well, Grid, Row, Col,
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { fetchEvents } from './redux/events';

const createMarkup = (htmlContent) => ({
  __html: htmlContent,
});

const bodyStyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '65%',
};

const Preview = ({
  eventsHTML, isLoading, hasError, dispatchFetchEvents,
}) => {
  const [startDate, setStartDate] = useState(new Date());

  const loader = isLoading ? (
    <FontAwesome name="spinner" spin size="2x" />
  ) : null;
  const error = hasError ? (
    <div>
      <p className="App-intro">An Error occurred.</p>
    </div>
  ) : null;
  const events = !isLoading && !hasError && eventsHTML ? (
    <div dangerouslySetInnerHTML={createMarkup(eventsHTML)} />
  ) : null;

  return (
    <div style={{ padding: '0 10%' }}>
      <Well>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4} style={{ textAlign: 'center' }}>
              <h4>Pick a Date:</h4>
            </Col>
            <Col xs={6} md={4}>
              <DatePicker
                value={startDate}
                onChange={(date) => setStartDate({ startDate: date })}
                format="DD/MM/YYYY"
              />
            </Col>
            <Col xs={6} md={4}>
              <Button onClick={() => dispatchFetchEvents(startDate)}>
                Preview Event
              </Button>
            </Col>
          </Row>
        </Grid>
      </Well>
      <div style={bodyStyle}>
        {loader}
        {error}
        {events}
      </div>
    </div>
  );
};

Preview.defaultProps = {
  eventsHTML: undefined,
};

Preview.propTypes = {
  eventsHTML: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  dispatchFetchEvents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.meetupEvents.isLoading,
  hasError: state.meetupEvents.hasError,
  eventsHTML: state.meetupEvents.eventsHTML,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchEvents: (date) => dispatch(fetchEvents(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
