import React from 'react';
import styled from 'styled-components';
import AnimatedPage from '../components/AnimatedPage';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 2rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 300px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PaymentInfo = styled.div`
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #555;
  text-align: center;

  span {
    font-weight: bold;
    color: #00d0ff;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px;
  font-size: 1rem;
  background-color: #00d0ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #00b5e0;
  }
`;

const SignupPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Signup form submitted!');
  };

  return (
    <AnimatedPage>
      <FormContainer>
        <h2>Inscription</h2>
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Nom complet" required />
          <Input type="email" placeholder="Adresse e-mail" required />
          <Input type="password" placeholder="Mot de passe" required />
          <PaymentInfo>
            En continuant, vous acceptez de payer un <span>abonnement unique de 20€</span> pour 20 Go d’espace de stockage.
          </PaymentInfo>
          <Button type="submit">S'inscrire et payer</Button>
        </Form>
      </FormContainer>
    </AnimatedPage>
  );
};

export default SignupPage;