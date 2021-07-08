import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const style = {

  container: {
    flex: 1,
  },
  counterScreenContainer:{
    flex: 1,
  },

  //General
  innerContainer:{
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  controllerButton:{
    borderWidth: 1,
    width: '50%'
  },

  //Header
  headerBox:{
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
  },
  headerText:{
    textAlign: 'center',
    fontSize: 35
  },

  //Time counter
  timeCounterContainer:{
    flex: 0.9,
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  controllerContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  timerText:{
    textAlign: 'center',
    fontSize: 30
  },

  //Savings counter
  savingsCounterContainer:{
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0
  },
  savingsCounterText:{
    textAlign: 'center',
    fontSize: 25
  },
  savingsControllerContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
};

export default style;