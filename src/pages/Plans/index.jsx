import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  padding: 24px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  margin-bottom: 16px;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Price = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: #4a4a4a;
`;

const FeatureList = styled.ul`
  margin-bottom: 16px;
  list-style-type: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  color: #666;
  margin-bottom: 8px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Plans() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/plans`)
      .then((response) => response.json())
      .then((data) => setPlans(data.plans))
      .catch((error) => console.error("Error fetching plans:", error));
  }, []);

  return (
    <Container>
      <Title>Choose Your Plan</Title>
      <Grid>
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <Price>
                {plan.price.toFixed(2)}€ HT <br />
                {(plan.price * (plan.tvaPercent / 100) + plan.price).toFixed(2)}
                € TTC
              </Price>
            </CardHeader>
            <FeatureList>
              <FeatureItem>{plan.description}</FeatureItem>
              <FeatureItem>Duration: {plan.duration} month(s)</FeatureItem>
              <FeatureItem>Storage: {plan.storageSize / 1024} GB</FeatureItem>
            </FeatureList>
            <Button onClick={() => navigate(`/signup/`)}>Select</Button>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
