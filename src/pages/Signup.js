import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    setShowPaymentModal(true);
  };

  const validatePayment = () => {
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardRegex.test(cardNumber) || !expiryRegex.test(expiry) || !cvvRegex.test(cvv)) {
      toast.error('Invalid payment details. Please try again.');
      return;
    }

    setShowPaymentModal(false);
    processSignup();
  };

  const processSignup = async () => {
    try {
      const registerResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        setError(registerData.message || 'Registration failed.');
        return;
      }

      toast.success('Payment successful! Account created. Logging in...');

      // Automatically log in after successful registration
      const loginResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        localStorage.setItem('token', loginData.token);
        navigate('/client'); // Redirect to client dashboard
      } else {
        setError('Registration succeeded but login failed. Please log in manually.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <AnimatedPage>
      <FormContainer>
        <h2>Inscription</h2>
        <Form onSubmit={handleSignup}>
          <Input type="text" placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <PaymentInfo>
            En continuant, vous acceptez de payer un <span>abonnement unique de 20€</span> pour 20 Go d’espace de stockage.
          </PaymentInfo>
          <Button type="submit">S'inscrire et payer</Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </FormContainer>

      {showPaymentModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Enter Payment Details</h3>
            <Input type="text" placeholder="Card Number (16 digits)" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
            <Input type="text" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
            <Input type="text" placeholder="CVV (3 digits)" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
            <Button onClick={validatePayment}>Confirm Payment</Button>
            <Button onClick={() => setShowPaymentModal(false)} style={{ backgroundColor: 'red', marginTop: '10px' }}>Cancel</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatedPage>
  );
};

export default SignupPage;
