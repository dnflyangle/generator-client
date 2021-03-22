import React, { useState } from "react";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button,
  FormControl,
  Well,
} from "react-bootstrap";

import { addGroupFromUrl } from "../../redux/addGroup";

const AddGroup = ({
  isLoading,
  hasError,
  isSuccess,
  message,
  dispatchAddGroup,
}) => {
  const [value, setValue] = useState(null);

  const getValidationState = () => {
    if (isEmpty(value)) {
      return null;
    }
    const regex = /^https:\/\/www.meetup.com\//i;
    if (regex.test(value)) {
      return "success";
    }
    return "error";
  };

  const handleValueChange = (e) => setValue(e.target.value);

  const handleAddGroup = () => dispatchAddGroup(value);

  return (
    <Well style={{ marginTop: "20px" }}>
      <FormGroup controlId="formBasicText" validationState={getValidationState}>
        <ControlLabel>Add new group</ControlLabel>
        <FormControl
          type="text"
          placeholder="Enter url"
          onChange={handleValueChange}
        />
        <FormControl.Feedback />
        <HelpBlock>
          For example: https://www.meetup.com/Sydney-CoreOS-User-Group/
        </HelpBlock>
      </FormGroup>
      {hasError && <h5 style={{ color: "red" }}>{message}</h5>}
      {isSuccess && (
        <h5 style={{ color: "green" }}>Successfully added group.</h5>
      )}
      <Button disabled={isLoading} onClick={handleAddGroup}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </Well>
  );
};

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

const mapStateToProps = (state) => ({
  isLoading: state.addGroup.isLoading,
  hasError: state.addGroup.hasError,
  isSuccess: state.addGroup.isSuccess,
  message: state.addGroup.message,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatchAddGroup: (url) => dispatch(addGroupFromUrl(url, ownProps.existingGroupNames)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);
