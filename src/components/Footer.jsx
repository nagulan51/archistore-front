import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';

const FooterContainer = styled.footer`
  background-color: ${colors.navbar};
  color: ${colors.textNavbar};
  text-align: center;
  padding: 1rem;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const Footer = () => (
  <FooterContainer>
    © 2024 Archistore. All rights reserved.
  </FooterContainer>
);

export default Footer;