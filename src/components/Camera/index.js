import React, { useState } from 'react';
import { Alert } from 'react-native';
import { BarcodeMask } from '@nartc/react-native-barcode-mask';
import RNBeep from 'react-native-a-beep';

import { RNCameraStyled } from './camera.styles';

export default function Camera() {
  const [listOfQrs, setListOfQrs] = useState([]);
  const [activeQr, setActiveQr] = useState(true);

  const barcodeRecognized = ({ data }) => {
    if (!listOfQrs.includes(data)) {
      setActiveQr(true);
      RNBeep.beep();
      setListOfQrs([...listOfQrs, data]);
    } else {
      setActiveQr(false);
      Alert.alert(`Voce ja leu o ${data}`);
    }
  };

  return (
    <>
      <RNCameraStyled onBarCodeRead={activeQr ? barcodeRecognized : null}>
        <BarcodeMask edgeColor="#0fc76e" backgroundColor="transparent" />
      </RNCameraStyled>
    </>
  );
}
