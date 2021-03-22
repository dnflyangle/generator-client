import React from "react";
import useAxios from "axios-hooks";
import { orderBy, map } from "lodash";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

import AddGroup from "./AddGroup";
import { GET_GROUPS } from "../../redux/apiEndpoint";

const MeetupGroups = () => {
  const [{ data, loading, error }] = useAxios(GET_GROUPS);

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
    <div>
      <div style={{ padding: "0 10%" }}>
        <AddGroup existingGroupNames={data.groups}/>
        <div>
          <h3>Existing Meetup groups</h3>
        </div>
        <ListGroup style={{ paddingTop: "1%" }}>
          {map(orderBy(data.groups), (group) => (
            <ListGroupItem
              key={group}
              href={`https://www.meetup.com/${group}/`}
              target="_blank"
            >
              {group}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default MeetupGroups;
