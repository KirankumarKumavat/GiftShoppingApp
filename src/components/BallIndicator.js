import { React, useEffect, StyleSheet, View, Animated, Easing, useTheme, useRef, Fonts, Text, Dimensions, commonColors } from '../utils/importLibrary'

export default function BallIndicator(props) {
   const { colors } = useTheme();
   props = {
      color: props.color != null ? props.color : commonColors.Blue,
      size: props.size != null ? props.size : 50,
      visible: props.visible != null ? props.visible : false,
      animationEasing: props.animationEasing != null ? props.animationEasing : Easing.linear,
      animationDuration: props.animationDuration != null ? props.animationDuration : 3000,
      hideAnimationDuration: props.hideAnimationDuration != null ? props.hideAnimationDuration : 200,
      animating: props.animating != null ? props.animating : true,
      interaction: props.interaction != null ? props.interaction : true,
      hidesWhenStopped: props.hidesWhenStopped != null ? props.hidesWhenStopped : true,
      trackWidth: 5,
      styles: props.styles,
      textstyle:props.textstyle,

   };
   const renderComponent = ({ index, count, progress }) => {
      let {
         size,
         color,
         trackWidth: borderWidth = size / 10,
         animationDuration,
      } = props;

      let frames = 60 * animationDuration / 1000;
      let easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);

      let sa = 7.5;
      let ea = 30;

      let sequences = 3;
      let rotations = 5;

      let inputRange = Array
         .from(new Array(frames), (item, frameIndex) => frameIndex / (frames - 1));

      let outputRange = Array
         .from(new Array(frames), (item, frameIndex) => {
            let progress = 2 * sequences * frameIndex / (frames - 1);
            let rotation = index ?
               +(360 - sa) :
               -(180 - sa);

            let sequence = Math.ceil(progress);

            if (sequence % 2) {
               progress = progress - sequence + 1;
            } else {
               progress = sequence - progress;
            }

            let direction = index ?
               -1 :
               +1;

            return (direction * (180 - (sa + ea)) * easing(progress) + rotation) + 'deg';
         });

      let layerStyle = {
         width: size,
         height: size,
         transform: [{
            rotate: (90 - sa) + 'deg',
         }, {
            rotate: progress.interpolate({
               inputRange: [0, 1],
               outputRange: ['0deg', (360 * rotations) + 'deg'],
            }),
         }],
      };

      let viewportStyle = {
         width: size,
         height: size,
         transform: [{
            translateY: index ?
               -size / 2 :
               0,
         }, {
            rotate: progress.interpolate({ inputRange, outputRange }),
         }],
      };

      let containerStyle = {
         width: size,
         height: size / 2,
         overflow: 'hidden',
      };

      let offsetStyle = index ?
         { top: size / 2 } :
         null;

      let lineStyle = {
         width: size,
         height: size,
         borderColor: color,
         borderRadius: size / 2,
         borderWidth,
      };

      return (
         <Animated.View style={styles.layer} {...{ key: index }}>
            <Animated.View style={layerStyle}>
               <Animated.View style={[containerStyle, offsetStyle]} collapsable={false}>
                  <Animated.View style={viewportStyle}>
                     <Animated.View style={containerStyle} collapsable={false}>
                        <Animated.View style={lineStyle} />
                     </Animated.View>
                  </Animated.View>
               </Animated.View>
            </Animated.View>
         </Animated.View>
      );
   };
   let { style, size: width, size: height } = props;
   return (

      <View style={props.visible ? [styles.container, style] : null}>
         {props.visible ?
            <View
               style={[{
                  flexDirection: 'row', backgroundColor: commonColors.White, height: 88, width: Dimensions.get('window').width - 60, alignItems: 'center', justifyContent: 'flex-start', shadowColor: commonColors.Black,
                  shadowOpacity: 0.4,
                  shadowRadius: 5,
                  borderRadius: 5,
                  elevation: 8
               }, props.styles]}>
               <View style={{ height: 88, width: width + 60, justifyContent: 'center', marginStart: 20 }}>
                  <Indicator
                     style={{ width, height, }}
                     renderComponent={renderComponent}
                     {...props}
                     count={2}
                  />
               </View>
               <Text style={[{ fontSize: 14, fontFamily: Fonts.montserratMedium, color: commonColors.Blue },props.textstyle]}>{'Loading...'}</Text>

            </View>

            : null}
      </View>


   );
}
export function Indicator(props) {
   props = {
      animationEasing: props.animationEasing,
      animationDuration: props.animationDuration,
      hideAnimationDuration: props.hideAnimationDuration,
      animating: props.animating,
      interaction: props.interaction,
      hidesWhenStopped: props.hidesWhenStopped,
      renderComponent: props.renderComponent,
      count: props.count,
   };
   var animationState = 0;
   const savedValue = 0;
   let { animating } = props;
   const progresss = new Animated.Value(0)
   const hideAnimations = new Animated.Value(animating ? 1 : 0)
   const prevProps = useRef();
   useEffect(() => {
      let { animating } = props;
      if (animating) {
         startAnimation();
      }
      if (animating && !prevProps.animating) {
         resumeAnimation();
      }

      if (!animating && prevProps.animating) {
         stopAnimation();
      }
      if (animating ^ prevProps.animating) {
         let hideAnimation = hideAnimations;
         let { hideAnimationDuration: duration } = props;
         Animated
            .timing(hideAnimation, { toValue: animating ? 1 : 0, duration, useNativeDriver: true, })
            .start();

      }
   }, [progresss]);
   const startAnimation = () => {
      let progress = progresss;
      let { interaction, animationEasing, animationDuration } = props;
      if (0 !== animationState) {
         return;
      }
      let animation = Animated
         .timing(progress, {
            duration: animationDuration,
            easing: animationEasing,
            useNativeDriver: true,
            isInteraction: interaction,
            toValue: 1,
         });
      Animated
         .loop(animation)
         .start();
      animationState = 1;
   }
   const stopAnimation = () => {
      let progress = progresss;
      if (1 !== animationState) {
         return;
      }
      let listener = progress
         .addListener(({ value }) => {
            progress.removeListener(listener);
            progress.stopAnimation(() => saveAnimation(value));
         });
      animationState = -1;
   }
   const saveAnimation = (value) => {
      let { animating } = props;
      savedValue = value;
      animationState = 0;
      if (animating) {
         resumeAnimation();
      }
   }
   const resumeAnimation = () => {
      let progress = progresss;
      let { interaction, animationDuration } = props;
      if (0 !== animationState) {
         return;
      }
      Animated
         .timing(progress, {
            useNativeDriver: true,
            isInteraction: interaction,
            duration: (1 - savedValue) * animationDuration,
            toValue: 1,
         })
         .start(({ finished }) => {
            if (finished) {
               progress.setValue(0);

               animationState = 0;
               startAnimation();
            }
         });
      savedValue = 0;
      animationState = 1;
   }
   const renderComponent = (item, index) => {
      let progress = progresss;
      let { renderComponent, count } = props;
      if ('function' === typeof renderComponent) {
         return renderComponent({ index, count, progress });
      }
      return null;
   }
   let hideAnimation = hideAnimations;
   let { count, hidesWhenStopped } = props;
   if (hidesWhenStopped) {
      props.style = []
         .concat(props.style || [], { opacity: hideAnimation });
   }
   return (
      <Animated.View {...props} >
         {Array.from(new Array(count), renderComponent)}
      </Animated.View>
   );
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      // backgroundColor: 'rgba(0, 0, 0, 0.1)',
      position: 'absolute',
      width: '100%',
      height: '100%',

   },

   layer: {
      ...StyleSheet.absoluteFillObject,

      justifyContent: 'center',
      alignItems: 'center',
   },
});
