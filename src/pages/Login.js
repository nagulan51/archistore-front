import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


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

const LoginPage = () => {
    return (
      <AnimatedPage>
        <FormContainer>
          <h2>Connexion</h2>
          <Form>
            <Input type="email" placeholder="Adresse e-mail" required />
            <Input type="password" placeholder="Mot de passe" required />
            <Button type="submit">Se connecter</Button>
          </Form>
          <p>
            Pas encore de compte ? <Link to="/signup">S'inscrire</Link>
          </p>
        </FormContainer>
      </AnimatedPage>
    );
};

export default LoginPage;