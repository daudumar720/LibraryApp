import {createSlice} from '@reduxjs/toolkit';
import {
  MD3LightTheme as LightTheme,
  MD3DarkTheme as DarkTheme,
} from 'react-native-paper';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'light',
  },
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme == 'light' ? 'dark' : 'light';
    },
  },
});

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;

export const lightTheme = {
  ...LightTheme,
  colors: {
    primary: 'rgb(93, 76, 191)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(229, 222, 255)',
    onPrimaryContainer: 'rgb(25, 0, 100)',
    secondary: 'rgb(95, 92, 113)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(229, 223, 249)',
    onSecondaryContainer: 'rgb(28, 25, 43)',
    tertiary: 'rgb(123, 82, 101)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 216, 231)',
    onTertiaryContainer: 'rgb(48, 17, 33)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(28, 27, 31)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(28, 27, 31)',
    surfaceVariant: 'rgb(229, 224, 236)',
    onSurfaceVariant: 'rgb(72, 69, 79)',
    outline: 'rgb(120, 118, 127)',
    outlineVariant: 'rgb(201, 197, 208)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(49, 48, 51)',
    inverseOnSurface: 'rgb(244, 239, 244)',
    inversePrimary: 'rgb(200, 191, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(247, 242, 252)',
      level2: 'rgb(242, 237, 250)',
      level3: 'rgb(237, 232, 248)',
      level4: 'rgb(236, 230, 247)',
      level5: 'rgb(232, 227, 246)',
    },
    surfaceDisabled: 'rgba(28, 27, 31, 0.12)',
    onSurfaceDisabled: 'rgba(28, 27, 31, 0.38)',
    backdrop: 'rgba(49, 47, 56, 0.4)',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    primary: 'rgb(200, 191, 255)',
    onPrimary: 'rgb(45, 18, 143)',
    primaryContainer: 'rgb(69, 50, 166)',
    onPrimaryContainer: 'rgb(229, 222, 255)',
    secondary: 'rgb(201, 195, 220)',
    onSecondary: 'rgb(49, 46, 65)',
    secondaryContainer: 'rgb(71, 68, 89)',
    onSecondaryContainer: 'rgb(229, 223, 249)',
    tertiary: 'rgb(236, 184, 206)',
    onTertiary: 'rgb(72, 37, 54)',
    tertiaryContainer: 'rgb(97, 59, 77)',
    onTertiaryContainer: 'rgb(255, 216, 231)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(28, 27, 31)',
    onBackground: 'rgb(229, 225, 230)',
    surface: 'rgb(28, 27, 31)',
    onSurface: 'rgb(229, 225, 230)',
    surfaceVariant: 'rgb(72, 69, 79)',
    onSurfaceVariant: 'rgb(201, 197, 208)',
    outline: 'rgb(146, 143, 153)',
    outlineVariant: 'rgb(72, 69, 79)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(229, 225, 230)',
    inverseOnSurface: 'rgb(49, 48, 51)',
    inversePrimary: 'rgb(93, 76, 191)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(37, 35, 42)',
      level2: 'rgb(42, 40, 49)',
      level3: 'rgb(47, 45, 56)',
      level4: 'rgb(49, 47, 58)',
      level5: 'rgb(52, 50, 62)',
    },
    surfaceDisabled: 'rgba(229, 225, 230, 0.12)',
    onSurfaceDisabled: 'rgba(229, 225, 230, 0.38)',
    backdrop: 'rgba(49, 47, 56, 0.4)',
  },
};
