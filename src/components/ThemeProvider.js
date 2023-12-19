import { React, whiteThemeColors, silverThemeColors,blueThemeColors,importIconsWhite,importIconsSilver,importIconsBlue } from '../utils/importLibrary'
export const ThemeContext = React.createContext({
    ColorName: 'white',
    colors: whiteThemeColors,
    icons:importIconsWhite,
    setScheme: () => { },
});

export const ThemeProvider = (props) => {
    // Getting the device color theme, this will also work with react-native-web
    //get color from api and pass here using pref.
    const colorScheme = 'white'// Can be dark | light | no-preference

    /*
    * To enable changing the app theme dynamicly in the app (run-time)
    * we're gonna use useState so we can override the default device theme
    */
    const [ColorName, setColor] = React.useState("white");

    // Listening to changes of device appearance while in run-time
    React.useEffect(() => {
        setColor(colorScheme);
    }, [colorScheme]);

    const defaultTheme = {
        ColorName,
        colors: ColorName === "white" ? whiteThemeColors :  ColorName === "silver" ? silverThemeColors : blueThemeColors,
        icons:ColorName === "white" ? importIconsWhite :  ColorName === "silver" ? importIconsSilver : importIconsBlue,
        setScheme: (scheme) => setColor(scheme),
    };
    return (
        <ThemeContext.Provider value={defaultTheme}>

            {props.children}
        </ThemeContext.Provider>
    );
};

// Custom hook to get the theme object returns {ColorName, colors, setScheme}
export const useTheme = () => React.useContext(ThemeContext);