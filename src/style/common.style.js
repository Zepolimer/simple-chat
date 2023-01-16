import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  flex: {
    flex: 1, 
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  flexStartCenter: {
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  flexBetweenCenter: {
    justifyContent: 'space-between',
    alignItems: "center",
  },

  width100: {
    width: '100%',
  },
  width90: {
    width: '90%',
    marginHorizontal: '5%',
  },
  width80: {
    width: '80%',
  },
  width70: {
    width: '70%',
  },

  mv12: {
    marginVertical: 12,
  },
  mv15: {
    marginVertical: 15,
  },
  mt10: {
    marginTop: 10,
  },
  mt12: {
    marginTop: 12,
  },
  mh10: {
    marginHorizontal: 10,
  },

  ph10: {
    paddingHorizontal: 10,
  },
  paddingBorder: {
    padding: 10,
    borderWidth: 1,
  },
  paddingBorder20: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F1F1',
  },
  borderRadius5: {
    borderRadius: 5,
  },
  borderRadius10: {
    borderRadius: 10,
  },
  borderRadius50: {
    borderRadius: 50,
  },

  textWhite: {
    color: '#FFFFFF',
  },
  textBlack: {
    color: '#000000',
  },

  chatFromBg: {
    backgroundColor: '#013652',
    borderColor: '#013652',
  },
  chatToBg: {
    backgroundColor: '#076191',
    borderColor: '#076191',
  },

  rounded30x30: {
    height: 25,
    width: 25,
    borderRadius: '50%',
  },
  rounded35x35: {
    height: 35,
    width: 35,
    borderRadius: '50%',
  },
  rounded50x50: {
    height: 50,
    width: 50,
    borderRadius: '50%',
  },

  boxShadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});