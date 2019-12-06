import styled from 'styled-components/native';
import { Text } from 'react-native';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ChangeCameraView = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  background-color: #112;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const ChangeCameraText = styled(Text)`
  letter-spacing: 2px;
  font-weight: bold;
  color: #c47308;
`;
