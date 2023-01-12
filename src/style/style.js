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
    marginVertical: 12,
    borderRadius: 5,
    ...common.width100,
  },
  authBtnSwitchView: {
    ...common.width100,
    flexDirection: 'row',
  },
  authBtnSwitchText: {
    fontWeight: '600',
  },
  blackBtn: {
    ...common.width90,
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: "center",
    marginTop: 12,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00000080',
  },
  chatText: {
    color: '#000000',
    fontSize: 16,
    marginLeft: 20,
  },
  chatBubbleFrom: {
    width: '80%',
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: '20%',
  },
  nameChatTo: {
    width: '80%',
    marginRight: '20%',
    marginTop: 12,
  },
  chatBubbleTo: {
    width: '80%',
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: '20%',
  },
  nameChatFrom: {
    width: '80%',
    marginLeft: '20%',
    textAlign: 'right',
    marginTop: 12,
  },
  horizontalWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: "center",
    height: 120,
    backgroundColor: '#000000',
    marginBottom: 30,
  },
  horizontalItem: {
    height: 80,
    width: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: "center",
    marginHorizontal: 10,
  },
  horizontalItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  horizontalItemImg: {
    height: 50,
    width: 50,
    borderRadius: '50%',
    backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16),
  },
});