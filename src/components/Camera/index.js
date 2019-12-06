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
  const [activeCam, setActiveCam] = useState(true);

  function openLink(data) {
    setActiveCam(true);
    Linking.canOpenURL(data).then(supported => {
      if (supported) {
        Linking.openURL(data);
      } else {
        Alert.alert(`Don't know how to open URI: ${data}`);
      }
    });
  }

  function barcodeRecognized({ data }) {
    setActiveCam(false);
    RNBeep.beep();
    ToastAndroid.showWithGravity(
      'LIDO COM SUCESSO',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );

    Alert.alert(
      'So...',
      'open url in browser?',
      [
        {
          text: 'Cancel',
          onPress: () => setActiveCam(true),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => openLink(data) },
      ],
      { cancelable: false }
    );
  }
  return (
    <>
      <RNCameraStyled
        onBarCodeRead={activeCam ? barcodeRecognized : null}
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
