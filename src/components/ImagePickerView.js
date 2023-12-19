
import { React, useState,Text, View, commonColors, StyleSheet, Fonts, importIcons, Modal, deviceWidth, ConstantsText, TouchableWithoutFeedback, ImagePicker } from '../utils/importLibrary'
export default function ImagePickerView(props) {
   const [Uri, setUri] = useState('');
   const chooseImage = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(image => {
          setUri(image);
          props.CloseModal
          props.onGetURI?.(image);
        })
       
    };
    const openCamera = () => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        useFrontCamera:false
      })
        .then(image => {
          setUri(image);
          props.CloseModal
          props.onGetURI?.(image);
        })
        
    };
   return (
      <Modal
         animationType={props.animationType != null ? props.animationType : 'none'}
         animated={props.animated != null ? props.animated : false}
         visible={props.visible != null ? props.visible : false}
         transparent={props.transparent != null ? props.transparent : false}
         onRequestClose={() => props.CloseModal}
      >
         <TouchableWithoutFeedback onPress={props.CloseModal}>
            <View style={[styles.styles, props.style]}>
               <TouchableWithoutFeedback onPress={null}>

                  <View style={[styles.containerstyle, props.containerstyle]} >
                     {/* {
                  props.components
               } */}
                     <TouchableWithoutFeedback onPress={chooseImage} >
                        <View style={[{ width: '100%' },props.galleryStyle]}>
                           <Text style={[{ fontSize: 16,fontFamily: Fonts.montserratMedium,color:commonColors.Blue  },props.galleryText]}>{ConstantsText.openGallery}</Text>
                        </View>
                     </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback onPress={openCamera}>
                        <View style={[{ width: '100%', marginTop: 15 },props.cameraStyle]}>
                           <Text style={[{ fontSize: 16,fontFamily: Fonts.montserratMedium,color:commonColors.Blue },props.cameraText]}>{ConstantsText.openCamera}</Text>
                        </View>
                     </TouchableWithoutFeedback>
                     <TouchableWithoutFeedback onPress={props.CloseModal}>
                        <View style={[{ width: '100%', marginTop: 20, alignItems: 'flex-end' },props.cameraStyle]}>
                           <Text style={[{ fontSize: 16,fontFamily: Fonts.montserratMedium,color:commonColors.Blue  },props.cancelText]}>{ConstantsText.Cancel}</Text>
                        </View>
                     </TouchableWithoutFeedback>
                  </View>
               </TouchableWithoutFeedback>
            </View>
         </TouchableWithoutFeedback>

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
      paddingHorizontal: 25,
      paddingVertical: 25,
      width: deviceWidth - 50

   }
});



