import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, HelpBlock, Button, FormControl, Well } from 'react-bootstrap';

import { addGroupFromUrl } from '../../redux/addGroup';

class AddGroup extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: undefined,
    };
  }
  getValidationState() {
    if (isEmpty(this.state.value)) {
      return null;
    }
    const regex = /^https:\/\/www.meetup.com\//i;
    if (regex.test(this.state.value)) {
      return 'success';
    }
    return 'error';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const {
      isLoading,
      hasError,
      isSuccess,
      message,
      dispatchAddGroup,
    } = this.props;
    return (
      <Well style={{ marginTop: '20px' }}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Add new group</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter url"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>For example: https://www.meetup.com/Sydney-CoreOS-User-Group/</HelpBlock>
        </FormGroup>
        {hasError && <h5 style={{ color: 'red' }}>{message}</h5> }
        {isSuccess && <h5 style={{ color: 'green' }}>Successfully added group.</h5> }
        <Button
          disabled={isLoading}
          onClick={() => dispatchAddGroup(this.state.value)}
        >{isLoading ? 'Submitting...' : 'Submit'}</Button>
      </Well>
    );
  }
}

AddGroup.defaultProps = {
  message: undefined,
};

AddGroup.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  message: PropTypes.string,
  dispatchAddGroup: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.addGroup.isLoading,
  hasError: state.addGroup.hasError,
  isSuccess: state.addGroup.isSuccess,
  message: state.addGroup.message,
});

const mapDispatchToProps = dispatch => ({
  dispatchAddGroup: url => dispatch(addGroupFromUrl(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);
