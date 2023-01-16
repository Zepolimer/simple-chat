import { StyleSheet } from 'react-native';
import common from '../style/common.style.js';


export default StyleSheet.create({
  viewDisplay: {
    ...common.flex,
    ...common.flexCenter,
    ...common.width90,
  },
  viewChat: {
    ...common.width90,
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
  authBtnSwitchView: {
    ...common.width100,
    ...common.flexRow,
  },
  authBtnSwitchText: {
    fontWeight: '600',
  },
  blackBtn: {
    ...common.width90,
    ...common.flexCenter,
    ...common.borderRadius5,
    paddingVertical: 12,
    paddingHorizontal: 32,
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
    ...common.width100,
    ...common.flexRow,
    ...common.flexBetweenCenter,
    height: 60,
    ...common.ph10,
  },
  headerInput: {
    ...common.width70,
    ...common.paddingBorder,
    ...common.borderRadius50,
    height: 40,
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
  checkbox: {
    ...common.rounded30x30,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000000',
  },
  checkboxChecked: {
    ...common.rounded30x30,
    borderWidth: 1,
    borderColor: 'tomato',
    backgroundColor: 'tomato',
  },

  addOrRemoveBtn: {
    ...common.rounded35x35,
    ...common.flexCenter,
    borderWidth: 1,
    borderColor: 'gray',
    position: 'absolute',
    right: '5%',
  }
});