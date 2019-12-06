import React, { useState, useContext } from 'react';
import { ToastAndroid, Linking, Alert } from 'react-native';
import { BarcodeMask } from '@nartc/react-native-barcode-mask';
import RNBeep from 'react-native-a-beep';
import { RNCamera } from 'react-native-camera';
import { Store } from '../../store';
import { RNCameraStyled } from './camera.styles';
import BottomOptions from '../BottomOptions';

export default function Camera() {
  const [state] = useContext(Store);

  function openLink(data) {
    Linking.canOpenURL(data).then(supported => {
      if (supported) {
        Linking.openURL(data);
      } else {
        Alert.alert(`Don't know how to open URI: ${data}`);
      }
    });
  }

  function barcodeRecognized({ data }) {
    RNBeep.beep();
    ToastAndroid.showWithGravity(
      'LIDO COM SUCESSO',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    openLink(data);
  }

  return (
    <>
      <RNCameraStyled
        onBarCodeRead={barcodeRecognized}
        type={
          state.cameraBottoms.cameraType
            ? RNCamera.Constants.Type.front
            : RNCamera.Constants.Type.back
        }
      >
        <BarcodeMask edgeColor="#c47308" backgroundColor="transparent" />
      </RNCameraStyled>
      <BottomOptions />
    </>
  );
}
