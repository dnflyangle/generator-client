import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button,
  FormControl,
  Well,
} from 'react-bootstrap';

import { addGroup } from './redux/actions';

const loadingSelector = (state) => state.meetupGroups.addGroupsLoading;
const errorSelector = (state) => state.meetupGroups.addGroupsError;
const successSelector = (state) => state.meetupGroups.addGroupsSuccess;
const groupsSelector = (state) => state.meetupGroups.groups;

const AddGroup = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);

  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const isSuccess = useSelector(successSelector);
  const existingGroups = useSelector(groupsSelector);

  const getValidationState = () => {
    if (isEmpty(value)) {
      return null;
    }
    const regex = /^https:\/\/www.meetup.com\//i;
    if (regex.test(value)) {
      return 'success';
    }
    return 'error';
  };

  const handleValueChange = (e) => setValue(e.target.value);

  const handleAddGroup = () => dispatch(addGroup(value, existingGroups));

  return (
    <Well style={{ marginTop: '20px' }}>
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
      {error && <h5 style={{ color: 'red' }}>{error}</h5>}
      {isSuccess && (
        <h5 style={{ color: 'green' }}>Successfully added group.</h5>
      )}
      <Button disabled={loading} onClick={handleAddGroup}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </Well>
  );
};

export default AddGroup;
