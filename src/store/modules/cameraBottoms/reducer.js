const INITIAL_STATE = { status: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CAMERA_STATUS':
      console.log(action);
      return { status: action.status, cameraType: action.cameraType };

    default:
      return state;
  }
};
