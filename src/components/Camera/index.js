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
  const [listOfQrs, setListOfQrs] = useState([]);
  const [activeCam, setActiveCam] = useState(true);

  function barcodeRecognized({ data }) {
    function openLink() {
      Linking.canOpenURL(data).then(supported => {
        if (supported) {
          Linking.openURL(data);
        } else {
          Alert.alert(`Don't know how to open URI: ${data}`);
        }
      });
    }

    if (!listOfQrs.includes(data)) {
      RNBeep.beep();
      setListOfQrs([...listOfQrs, data]);
      setActiveCam(true);
      ToastAndroid.showWithGravity(
        'GRAVADO COM SUCESSO',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      Alert.alert(
        'So...',
        'open url in browser?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => openLink() },
        ],
        { cancelable: false }
      );
    } else {
      setActiveCam(false);
    }
  }

  if (!activeCam) {
    ToastAndroid.showWithGravity(
      'JÁ FOI LIDO',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
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
        <BarcodeMask edgeColor="purple" backgroundColor="transparent" />
      </RNCameraStyled>
      <BottomOptions />
    </>
  );
}
