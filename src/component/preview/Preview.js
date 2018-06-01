import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Button, Panel, Grid, Row, Col } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import FontAwesome from 'react-fontawesome';

import { fetchEvents } from '../../redux/meetup';
import './Preview.css';

const createMarkup = htmlContent => ({
  __html: htmlContent,
});

const bodyStyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '50%',
};

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
    };
  }

  render() {
    const {
      eventsHTML,
      isLoading,
      hasError,
      dispatchFetchEvents,
    } = this.props;
    const loader = isLoading ? <FontAwesome name="spinner" spin size="2x" /> : null;
    const error = hasError ? <div><p className="App-intro">An Error occurred.</p></div> : null;
    const events = (!isLoading && !hasError && eventsHTML) ?
      <div dangerouslySetInnerHTML={createMarkup(eventsHTML)} /> : null;

    return (
      <div>
        <Panel>
          <Panel.Body>
            <Grid>
              <Row className="show-grid">
                <Col xs={6} md={4} style={{ textAlign: 'center' }}>
                  <Panel.Title>Pick a Date</Panel.Title>
                </Col>
                <Col xs={6} md={4}>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={date => this.setState({ startDate: date })}
                    dateFormat="DD/MM/YYYY"
                  />
                </Col>
                <Col xs={6} md={4}>
                  <Button
                    onClick={() => dispatchFetchEvents(this.state.startDate)}
                  >
                    Preview Event
                  </Button>
                </Col>
              </Row>
            </Grid>
          </Panel.Body>
        </Panel>
        <div style={bodyStyle}>
          {loader}
          {error}
          {events}
        </div>
      </div >
    );
  }
}

Preview.defaultProps = {
  eventsHTML: undefined,
};

Preview.propTypes = {
  eventsHTML: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  dispatchFetchEvents: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.meetup.isLoading,
  hasError: state.meetup.hasError,
  eventsHTML: state.meetup.eventsHTML,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchEvents: date => dispatch(fetchEvents(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
