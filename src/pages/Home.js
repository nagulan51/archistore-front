import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AnimatedPage from '../components/AnimatedPage';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #00d0ff, #ffffff);
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #000000;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #333333;
  margin-bottom: 2rem;
`;

const FeaturesSection = styled.div`
  margin: 2rem 0;
  max-width: 800px;
`;

const FeatureItem = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: #000000;
  font-weight: bold;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #555555;
`;

const OffersSection = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 2rem;
  max-width: 600px;
  margin: 2rem 0;
`;

const OfferTitle = styled.h2`
  font-size: 1.5rem;
  color: #000000;
  margin-bottom: 1rem;
`;

const OfferDescription = styled.p`
  font-size: 1rem;
  color: #555555;
  margin-bottom: 2rem;
`;

const OfferPrice = styled.p`
  font-size: 2rem;
  color: #00d0ff;
  font-weight: bold;
`;

const Button = styled(Link)`
  text-decoration: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: #ffffff;
  background-color: #000000;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333333;
  }
`;

const LandingPage = () => {
  return (
    <AnimatedPage>
      <LandingContainer>
        <Title>Welcome to Archistore</Title>
        <Subtitle>Your secure solution for managing architectural files.</Subtitle>

        <FeaturesSection>
          <FeatureItem>
            <FeatureTitle>🗂 Secure File Storage</FeatureTitle>
            <FeatureDescription>
              Clients can securely upload, view, and manage their architectural files with ease.
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>🔒 Full Security</FeatureTitle>
            <FeatureDescription>
              End-to-end encryption ensures your files are safe and accessible only by authorized users.
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>📊 Admin Dashboard</FeatureTitle>
            <FeatureDescription>
              Administrators can view storage usage, client activity, and generate comprehensive statistics.
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>💳 Flexible Storage Plans</FeatureTitle>
            <FeatureDescription>
              Start with 20GB of storage for just €20. Upgrade anytime for an additional €20 per 20GB.
            </FeatureDescription>
          </FeatureItem>
        </FeaturesSection>

        <OffersSection>
          <OfferTitle>Get Started with Archistore</OfferTitle>
          <OfferDescription>
            Subscribe for a one-time fee of €20 and enjoy 20GB of secure storage.
            Upgrade anytime as your storage needs grow.
          </OfferDescription>
          <OfferPrice>€20 / 20GB</OfferPrice>
          <Button to="/signup">Sign Up Now</Button>
        </OffersSection>

        <p>Already have an account? <Link to="/login">Log In</Link></p>
      </LandingContainer>
    </AnimatedPage>
  );
};

export default LandingPage;