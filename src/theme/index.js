import React from 'react';
import { extendTheme } from 'native-base';


const theme = extendTheme({
    fontConfig: {
        Roboto: {
            100: {
                normal: 'Roboto-Light',
                italic: 'Roboto-LightItalic',
            },
            200: {
                normal: 'Roboto-Light',
                italic: 'Roboto-LightItalic',
            },
            300: {
                normal: 'Roboto-Light',
                italic: 'Roboto-LightItalic',
            },
            400: {
                normal: 'Roboto-Regular',
                italic: 'Roboto-Italic',
            },
            500: {
                normal: 'Roboto-Medium',
            },
            600: {
                normal: 'Roboto-Medium',
                italic: 'Roboto-MediumItalic',
            },
        },
    },
    fonts: {
        heading: 'Roboto',
        body: 'Roboto',
        mono: 'Roboto',
    },
     components: {
         Button: {
             // Can simply pass default props to change default behaviour of components.
             baseStyle: {
                 rounded: "md",
          },
            defaultProps: {
                colorScheme: "red",
           },
      },
    }

    /*
     config: {
         // Changing initialColorMode to 'dark'
         initialColorMode: 'dark',
     },

         Heading: {
             // Can pass also function, giving you access theming tools
             baseStyle: ({colorMode}) => {
                 return {
                     color: colorMode === "dark" ? "red.300" : "blue.300",
                     fontWeight: "normal",
                 };
             },
         }

     }
      */
    });

export default theme;
