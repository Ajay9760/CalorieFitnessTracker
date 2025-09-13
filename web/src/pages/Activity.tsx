import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ComingSoon = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Activity: React.FC = () => {
  return (
    <Container>
      <ComingSoon>
        <h2>🏃 Activity Tracking</h2>
        <p>Step tracking and exercise logging coming soon!</p>
        <p>This will include integration with fitness trackers and manual activity logging.</p>
      </ComingSoon>
    </Container>
  );
};

export default Activity;
