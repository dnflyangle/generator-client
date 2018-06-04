import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { FormGroup, ControlLabel, HelpBlock, Button, FormControl, Well } from 'react-bootstrap';

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
    return (
      <Well style={{ marginTop: '20px' }}>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Add new group</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter url"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>For example: https://www.meetup.com/Sydney-CoreOS-User-Group/</HelpBlock>
          </FormGroup>
          <Button type="submit">Submit</Button>
        </form>
      </Well>
    );
  }
}

export default AddGroup;
