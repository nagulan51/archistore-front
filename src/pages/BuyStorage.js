import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #00d0ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #00b5e0;
  }
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

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 90%;
`;

const BuyStorage = () => {
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleBuyStorage = () => {
    setShowPaymentModal(true);
  };

  const validatePayment = async () => {
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardRegex.test(cardNumber) || !expiryRegex.test(expiry) || !cvvRegex.test(cvv)) {
      toast.error('Invalid payment details. Please try again.');
      return;
    }

    setShowPaymentModal(false);
    processStoragePurchase();
  };

  const processStoragePurchase = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/storage/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ amount: 20 }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Storage successfully added!');
        navigate('/client'); // Redirect back to dashboard
      } else {
        toast.error('Failed to add storage.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Buy More Storage</h2>
      <p>Upgrade your storage with an additional 20GB for just $20.</p>
      <Button onClick={handleBuyStorage}>Buy 20GB for $20</Button>

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
    </Container>
  );
};

export default BuyStorage;