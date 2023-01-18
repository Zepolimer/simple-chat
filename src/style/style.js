import { StyleSheet } from 'react-native';
import common from '../style/common.style.js';


export default StyleSheet.create({
  screen: {
    position: 'relative',
    minHeight: '100%',
  },
  viewDisplay: {
    ...common.flex,
    ...common.flexCenter,
    ...common.width90,
  },
  viewChat: {
    ...common.width90,
  },
  screenView: {
    ...common.width90,
    ...common.mt12,
    ...common.paddingBorder,
    ...common.borderRadius5,
  },

  title: {
    ...common.mv15,
  },
  selfAlignItem: {
    alignSelf: "start",
  },

  input: {
    ...common.width100,
    ...common.mv12,
    ...common.paddingBorder,
    ...common.borderRadius5,
    height: 40,
  },
  passwordInput: {
    ...common.width100,
    ...common.flexRow,
    ...common.flexBetweenCenter,
    ...common.mv12,
    ...common.paddingPasswordInput,
    ...common.borderRadius5,
    height: 40,
  },
  passwordText: {
    width: '90%',
  },
  passwordEye: {
    ...common.flexCenter,
    ...common.borderRadius5,
    height: 38,
    width: 40,
    // backgroundColor: 'tomato',
  },
  authBtnSwitchView: {
    ...common.width100,
    ...common.flexRow,
  },
  authBtnSwitchText: {
    fontWeight: '600',
  },
  blackBtn: {
    ...common.width70,
    ...common.mauto,
    ...common.p10,
    ...common.borderRadius5,
    ...common.boxShadow,
    backgroundColor: 'black',
  },
  blackBtnText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  chatWrapper: {
    ...common.boxShadow,
  },
  chatBtn: {
    ...common.flexRow,
    ...common.flexStartCenter,
    ...common.mt12,
    ...common.paddingBorder,
    ...common.borderRadius5,
    position: 'relative',
  },
  chatText: {
    ...common.textBlack,
    marginLeft: 20,
  },

  chatBubbleFrom: {
    ...common.width80,
    ...common.mt10,
    ...common.paddingBorder,
    ...common.borderRadius5,
    ...common.chatFromBg,
    marginLeft: '20%',
  },
  nameChatTo: {
    ...common.width80,
    ...common.mt12,
    marginRight: '20%',
  },
  chatBubbleTo: {
    ...common.width80,
    ...common.mt10,
    ...common.paddingBorder,
    ...common.borderRadius5,
    ...common.chatToBg,
    marginRight: '20%',
  },
  nameChatFrom: {
    ...common.width80,
    marginLeft: '20%',
    textAlign: 'right',
    marginTop: 12,
  },
  chatBubbletext: {
    ...common.textWhite,
  },

  horizontalWrapper: {
    ...common.flexRow,
    ...common.flexStartCenter,
    flexWrap: 'nowrap',
    height: 120,
    backgroundColor: '#000000',
  },
  horizontalItem: {
    height: 80,
    width: 100,
    ...common.flexColumn,
    ...common.flexBetweenCenter,
    ...common.mh10,
  },
  horizontalItemGroupe: {
    height: 80,
    padding: 10,
    ...common.flexColumn,
    ...common.flexBetweenCenter,
    ...common.mh10,
    ...common.borderRadius10,
    backgroundColor: '#F1F1F1',
  },
  horizontalItemTextGroupe: {
    ...common.textBlack,
  },
  horizontalItemText: {
    ...common.textWhite,
  },
  horizontalItemImg: {
    ...common.rounded50x50,
    backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16),
  },

  header: {
    ...common.width90,
    ...common.flexRow,
    ...common.flexBetweenCenter,
    height: 60,
  },
  headerInput: {
    ...common.width70,
    ...common.paddingBorder,
    ...common.borderRadius50,
    height: 40,
  },
  headerCta: {
    ...common.flexCenter,
    ...common.borderRadius50,
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: '#000000',
  },
  headerBtn: {
    ...common.rounded50x50,
  },

  whiteCard: {
    ...common.width90,
    ...common.paddingBorder20,
    ...common.mv15,
    ...common.borderRadius5,
    ...common.boxShadow,
    backgroundColor: '#FFFFFF',
  },
  flexRowBetween: {
    ...common.width100,
    ...common.flexRow,
    ...common.flexBetweenCenter,
    ...common.mv25,
  },
  checkbox: {
    ...common.rounded30x30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000000',
  },
  checkboxChecked: {
    ...common.rounded30x30,
    borderWidth: 1,
    backgroundColor: 'tomato',
  },

  addOrRemoveBtn: {
    ...common.rounded35x35,
    ...common.flexCenter,
    borderWidth: 1,
    borderColor: 'gray',
    position: 'absolute',
    right: '5%',
  },

  getPressable: {
    ...common.width70,
    ...common.mauto,
    ...common.p10,
    ...common.borderRadius5,
    ...common.boxShadow,
    backgroundColor: 'lightskyblue',
  },
  deletePressable: {
    ...common.width70,
    ...common.mauto,
    ...common.p10,
    ...common.borderRadius5,
    ...common.boxShadow,
    backgroundColor: 'red',
  },
  deletePressableText: {
    ...common.textWhite,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
  },
  pressableWarning: {
    marginBottom: 15,
  },
  pressableWarningBold: {
    marginBottom: 15,
    fontWeight: '600',
    color: 'red',
  },

  toggleCheckoxWrapper: {
    ...common.flexRow,
    ...common.alignCenter,
    ...common.width70,
    ...common.mauto,
    ...common.mt12,
    ...common.paddingBorder,
    ...common.borderRadius5,
    paddingLeft: 15,
  },
  toggleCheckboxText: {
    paddingLeft: 15,
  },
  toggleCheckboxTextBold: {
    paddingLeft: 15,
    fontWeight: '600',
    color: 'tomato',
  },

  keyboardWrapper: {
    ...common.width90,
    ...common.flexRow,
    ...common.flexBetweenCenter,
    position: 'absolute',
    bottom: 10,
    left: 0,
  },
  keyboardInput: {
    ...common.width80,
    ...common.paddingBorder,
    ...common.borderRadius5,
    minHeight: 40,
    maxHeight: 80,
  },
  keyboardBtn: {
    ...common.flexCenter,
    ...common.borderRadius5,
    width: 40,
    height: 40,
    backgroundColor: 'black',
  },
});