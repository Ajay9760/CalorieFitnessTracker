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

const Profile: React.FC = () => {
  return (
    <Container>
      <ComingSoon>
        <h2>👤 User Profile</h2>
        <p>Profile management and settings coming soon!</p>
        <p>This will include dietary preferences, regional food choices, and personal goals.</p>
      </ComingSoon>
    </Container>
  );
};

export default Profile;
