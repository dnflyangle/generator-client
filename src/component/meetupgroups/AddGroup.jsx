import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button,
  FormControl,
  Well,
} from "react-bootstrap";

import { addGroup } from "./redux/actions";

const loadingSelector = (state) => {
  const { meetupGroups } = state;
  return meetupGroups.addGroupsLoading || meetupGroups.getGroupsLoading;
};

const errorSelector = (state) => state.meetupGroups.addGroupsError;
const addGroupLoadingSelector = (state) => state.meetupGroups.addGroupsLoading;
const successSelector = (state) => state.meetupGroups.addGroupsSuccess;
const groupsSelector = (state) => state.meetupGroups.groups;

const calculateValidationState = (value) => {
  if (!value || value.length === 0) {
    return null;
  }
  const regex = /^https:\/\/www.meetup.com\//i;
  if (regex.test(value)) {
    return "success";
  }
  return "error";
};

const AddGroup = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [validationState, setValidationState] = useState(null);

  const loading = useSelector(loadingSelector);
  const addGroupLoading = useSelector(addGroupLoadingSelector);
  const error = useSelector(errorSelector);
  const isSuccess = useSelector(successSelector);
  const existingGroups = useSelector(groupsSelector);

  useEffect(() => {
    setValidationState(calculateValidationState(value));
  }, [value, setValidationState]);

  const handleValueChange = (e) => setValue(e.target.value);

  const handleAddGroup = () => dispatch(addGroup(value, existingGroups));

  return (
    <Well style={{ marginTop: "20px" }}>
      <FormGroup controlId="formBasicText" validationState={validationState}>
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
      {error && <h5 style={{ color: "red" }}>{error}</h5>}
      {isSuccess && (
        <h5 style={{ color: "green" }}>Successfully added group.</h5>
      )}
      <Button disabled={loading} onClick={handleAddGroup}>
        {addGroupLoading ? 'Submitting' : 'Submit'}
      </Button>
    </Well>
  );
};

export default AddGroup;
