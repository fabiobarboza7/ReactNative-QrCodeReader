import React from 'react';
import Camera from '../../components/Camera';
import { Container } from './main.styles';

export default function Main() {
  return (
    <Container>
      <Camera />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'QrCode',
};
