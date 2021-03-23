import React from "react";

import AddGroup from "./AddGroup";
import GroupList from "./GroupList";

const MeetupGroups = () => {
  return (
    <div>
      <div style={{ padding: "0 10%" }}>
        <AddGroup />
        <div>
          <h3>Existing Meetup groups</h3>
        </div>
        <GroupList />
      </div>
    </div>
  );
};

export default MeetupGroups;
