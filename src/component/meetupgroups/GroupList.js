import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { orderBy, map } from "lodash";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

import { getGroups } from "./redux/meetupGroups";

const loadingSelector = (state) => state.meetupGroups.isLoading;
const errorSelector = (state) => state.meetupGroups.hasError;
const groupsSelector = (state) => state.meetupGroups.groups;

const GroupList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const groups = useSelector(groupsSelector);

  if (loading) {
    return <FontAwesome name="spinner" spin size="2x" />;
  }

  if (error) {
    return (
      <div>
        <p className="App-intro">An Error occurred.</p>
      </div>
    );
  }
  return (
    <ListGroup style={{ paddingTop: "1%" }}>
      {map(orderBy(groups), (group) => (
        <ListGroupItem
          key={group}
          href={`https://www.meetup.com/${group}/`}
          target="_blank"
        >
          {group}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default GroupList;
