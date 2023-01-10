import { StyleSheet } from 'react-native';
import common from '../style/common.style.js';


export default StyleSheet.create({
  viewDisplay: {
    ...common.flexCenter,
    ...common.width90,
  },
  viewChat: {
    ...common.width90,
  },
  selfAlignItem: {
    alignSelf: "start",
  },
  input: {
    ...common.paddingBorder,
    height: 40,
    margin: 12,
    borderRadius: 5,
    ...common.width100,
  },
  authBtnSwitchView: {
    ...common.width100,
    flexDirection: 'row',
  },
  authBtnSwitchText: {
    fontWeight: 600,
  },
  blackBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: 'black',
  },
  blackBtnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  chatBtn: {
    ...common.width90,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  chatText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  chatBubbleFrom: {
    width: '80%',
    marginTop: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: '20%',
  },
  chatBubbleTo: {
    width: '80%',
    marginTop: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: '20%',
  }
});