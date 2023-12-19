
import { React, View, commonColors, StyleSheet, Modal, deviceWidth } from '../utils/importLibrary'
export default function ModalView(props) {
   return (
      <Modal
         animationType={props.animationType != null ? props.animationType : 'none'}
         animated={props.animated != null ? props.animated : false}
         visible={props.visible != null ? props.visible : false}
         transparent={props.transparent != null ? props.transparent : false}
         onRequestClose={() => props.CloseModal}>
         <View style={[styles.styles, props.style]}>
            <View style={[styles.containerstyle, props.containerstyle]}>
               {
                  props.components
               }
            </View>
         </View>

      </Modal>

   );
}
const styles = StyleSheet.create({
   styles: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: commonColors.Transparent,
   },
   containerstyle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: deviceWidth,
      backgroundColor: commonColors.White,
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 20,
      width: deviceWidth

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