import React, { useContext } from 'react';
import { Text } from 'react-native';
import * as CameraBottomsAction from '../../store/modules/cameraBottoms/actions';
import { Container, ChangeCameraView } from './bottomOptions.styles';
import { Store } from '../../store';

export default function BottomOptions() {
  const [state, dispatch] = useContext(Store);

  function handleToggleCamera() {
    dispatch(
      CameraBottomsAction.cameraStatus({
        status: true,
        cameraType: !state.cameraBottoms.cameraType,
      })
    );
  }

  return (
    <Container>
      <ChangeCameraView onPress={handleToggleCamera}>
        <Text>Change Camera</Text>
      </ChangeCameraView>
    </Container>
  );
}
