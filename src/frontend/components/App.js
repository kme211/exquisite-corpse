import React, {PropTypes} from 'react';
import styled from 'styled-components';
import {fonts} from 'components/globals';

const Wrapper = styled.div`
  font-size: 16px;
  font-family: ${fonts.primary};
  padding: 0;
  margin: 0;
`;

class App extends React.Component {
  render() {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;