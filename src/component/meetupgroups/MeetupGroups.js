import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { getGroups } from '../../redux/meetupGroups';


class MeetupGroups extends Component {
  componentDidMount() {
    this.props.dispatchGetGroups();
  }

  render() {
    const {
      groups,
      isLoading,
      hasError,
    } = this.props;

    const loader = isLoading ? <FontAwesome name="spinner" spin size="2x" /> : null;
    const error = hasError ? <div><p className="App-intro">An Error occurred.</p></div> : null;
    const groupList = (!isLoading && !hasError && groups) ?
      (<ListGroup>
        {map(this.props.groups, group => <ListGroupItem>{group}</ListGroupItem>)}
      </ListGroup>) : null;

    return (
      <div>
        {loader}
        {error}
        {groupList}
      </div>
    );
  }
}

MeetupGroups.defaultProps = {
  groups: null,
};

MeetupGroups.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  groups: PropTypes.arrayOf(PropTypes.string),
  dispatchGetGroups: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.meetupGroups.isLoading,
  hasError: state.meetupGroups.hasError,
  groups: state.meetupGroups.groups,
});

const mapDispatchToProps = dispatch => ({
  dispatchGetGroups: () => dispatch(getGroups()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MeetupGroups);
