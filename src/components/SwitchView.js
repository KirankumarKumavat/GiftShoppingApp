
import { React, View, commonColors, StyleSheet, Modal, deviceWidth, Text,useTheme,TouchableWithoutFeedback } from '../utils/importLibrary'
export default function SwitchView(props) {
   const { ColorName,colors,icons, setScheme } = useTheme();

   return (

      <View style={[styles.style, props.style]}>
         <View style={{}}>
            <Text style={[styles.textstyles, props.textstyles]}>{props.text}</Text>
         </View>
         <TouchableWithoutFeedback onPress={props.onChangeValues} >
         <View style={[styles.Switchstyles, props.Switchstyles]}>
            {props.values? 
               <View style={[styles.containerstyleOn, props.containerstyleOn,]}>
               </View>
            :
               <View style={[styles.containerstyleOff, props.containerstyleOff,]}>
               </View>
            }
         </View>
         </TouchableWithoutFeedback>
      </View>
   );
}
const styles = StyleSheet.create({
   style: {
      flexDirection: 'row',
      width: deviceWidth,
      justifyContent: 'space-between'
   },
   textstyles: {
      color: 'black',
      fontSize: 16
   },
   Switchstyles: {
      height: 25,
      width: 50,
      justifyContent: 'center',
      borderRadius: 15,
      paddingHorizontal:5,
      backgroundColor: commonColors.Black,
   },
   containerstyleOff: {
      height: 15,
      width: 15,
      borderRadius: 15 / 2,
      backgroundColor: '#747474'
   },
   containerstyleOn: {
      height: 15,
      width: 15,
      borderRadius: 15 / 2,
      backgroundColor: '#07742D',
      alignSelf:'flex-end'
      
   }
});





// usee in file code for

// <ModalView
// visible={isModalVisible}
// transparent={true}
// containerstyle={{ width: deviceWidth - 50 }}
// components={
//   <View style={{}}>
//     <Text style={{ color: 'red' }}>giijijb ifg</Text>
//   </View>
// }
// />