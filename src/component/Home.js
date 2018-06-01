import React from 'react';
import { Button } from 'react-bootstrap';

const wellStyles = {
  maxWidth: 400,
  margin: '0 auto 10px',
};

const Home = () => (
  <div>
    <div className="well" style={wellStyles}>
      <Button bsStyle="primary" bsSize="large" href="/" block>
        Maintain Meetup Groups
      </Button>
      <Button bsStyle="success" bsSize="large" href="/preview" block>
        Preview Weekly Email Content
      </Button>
    </div>
  </div>
);

export default Home;
