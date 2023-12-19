
import { React, Text, Image, View, commonColors, TouchableWithoutFeedback, StyleSheet, Fonts, importIconsSilver, importIconsWhite ,useTheme, importImages } from '../utils/importLibrary'
export default function Header(props) {
   const { ColorName,colors,icons, setScheme } = useTheme();

   return (
      <View style={[styles.container, props.style]}>
            <TouchableWithoutFeedback onPress={props.leftBtnOnPress}>
               <View style={[styles.leftBtnStyle, props.leftBtnStyle]}>
                  {props.leftBtn != null ? props.leftBtn
                     : props.leftBtnOnPress ? icons.backIcon : null}
               </View>
            </TouchableWithoutFeedback>
         <View style={{justifyContent:'center',alignItems:'center'}} >
            <Text style={[styles.titleStyle, props.titleStyle]}>{props.headerTitle}</Text>
            {
               props.HeaderLogoImage ?
               <Image style={[styles.HeaderLogo, props.HeaderLogo]} source={props.HeaderLogoImage} >{props.headerImage}</Image>
               : null
            }
         </View>
            <TouchableWithoutFeedback onPress={props.rightBtnOnPress}>
               <View style={[styles.rightBtnStyle, props.rightBtnStyle]}>
                  {props.rightBtn != null ? props.rightBtn
                     : null}
               </View>
            </TouchableWithoutFeedback>
      </View>
   );
}
const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      backgroundColor: commonColors.Black,
      height: 60,
      alignItems: 'center',
      // justifyContent: 'center',
   },
   titleStyle: {
      color: commonColors.White,
      fontSize: Fonts.LargeSize,
   },
   HeaderLogo:{
      marginTop:65,
      height:180,
      width:180,
   },
   leftBtnStyle:{
      position: 'absolute',
      left:10,
     width:35,
     alignItems:'center',
     justifyContent:'center',
     height:40
  },
   rightBtnStyle:{
      right: 20, position: 'absolute',
   }
});



