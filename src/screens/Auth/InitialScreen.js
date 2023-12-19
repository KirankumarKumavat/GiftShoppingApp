import { React, View, Text, Fragment, importImages, Image, useEffect, useTheme, commonColors, StorageService, CommonActions } from '../../utils/importLibrary'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InitialScreen({ route, navigation }) {
   console.log('route ===>', route);
   const { ColorName, colors, icons, setScheme } = useTheme();
   
   /** 
   * Life cycle method 
   */
   useEffect((props) => {
      console.log('props ===>',props);
      load()
   }
   )

   /**
    * Session management of screens
    */
   const load = async () => {

         setTimeout(function () {
            const resetAction = CommonActions.reset({
               index: 0,
               routes: [{ name: "SplashScreen" }]
            });
            navigation.dispatch(resetAction);
         }, 0.1);
      
   }
   return (
      // <View>
      //    <SafeAreaView style={{ flex: 0, backgroundColor: 'red' }} />
      //    <SafeAreaView style={{ flex: 1, backgroundColor: 'yellow' }}>
      //       <View style={{ flex: 1, backgroundColor: 'green' }} />
      //    </SafeAreaView>
      // </View>

      <View>

      </View>

      // <View style={{ flex: 1 }}>
      //    <View style={{ flex: 1 }}>
      //       <SafeAreaView style={{ flex: 1 }}>
      //          <View style={{ flex: 1 }}>
      //             <Text>Content Goes here</Text>
      //          </View>
      //       </SafeAreaView>
      //    </View>
      //    <View style={{ flexDirection: 'row', flex: 0 }}>
      //       <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }} />
      //       <SafeAreaView style={{ flex: 1, backgroundColor: 'green' }} />
      //    </View>
      // </View>
   );

  
}