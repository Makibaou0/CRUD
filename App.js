import {View, Text} from 'react-native';
import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import ToDoList from './src/pages/ToDoList';

const App = () => {
  const theme = extendTheme({
    fontConfig: {
      Poppins: {
        100: {
          normal: 'Poppins-Light',
          italic: 'Poppins-LightItalic',
        },
        200: {
          normal: 'Poppins-Light',
          italic: 'Poppins-LightItalic',
        },
        300: {
          normal: 'Poppins-Light',
          italic: 'Poppins-LightItalic',
        },
        400: {
          normal: 'Poppins-Regular',
          italic: 'Poppins-Italic',
        },
        500: {
          normal: 'Poppins-Medium',
        },
        600: {
          normal: 'Poppins-Medium',
          italic: 'Poppins-MediumItalic',
        },

        700: {
          normal: 'Poppins-Bold',
        },
        800: {
          normal: 'Poppins-Bold',
          italic: 'Poppins-BoldItalic',
        },
        900: {
          normal: 'Poppins-Bold',
          italic: 'Poppins-BoldItalic',
        },
      },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
      heading: 'Poppins',
      body: 'Poppins',
      mono: 'Poppins',
    },
  });
  return (
    <NativeBaseProvider theme={theme}>
      <ToDoList />
    </NativeBaseProvider>
  );
};

export default App;
