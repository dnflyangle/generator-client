import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

const wellStyles = {
  maxWidth: 400,
  margin: '0 auto 10px',
};

const jumbotronHeader = {
  textAlign: 'center',
  paddingBottom: '3%',
};

const buttonStyle = {
  marginBottom: '5%',
};

const Home = () => (
  <Jumbotron>
    <div style={jumbotronHeader}>
      <h1>{"G'day Straya!"}</h1>
      <p>
        As a Thoughtworker, I want to ...
      </p>
    </div>
    <div className="well" style={wellStyles}>
      <Button bsStyle="primary" bsSize="large" href="/" style={buttonStyle} block>
        Maintain Meetup Groups
      </Button>
      <Button bsStyle="success" bsSize="large" href="/preview" block>
        Preview Weekly Email Content
      </Button>
    </div>
  </Jumbotron>
);

export default Home;
