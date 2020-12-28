import { createSlice } from '@reduxjs/toolkit'

const LIGHT = 'light'
const DARK = 'dark'

export const themeSlice = createSlice({
     name: 'theme',
     initialState: {
          currentTheme: LIGHT
     },
     reducers: {
          setTheme: (state, action) => {
               state.currentTheme = action.payload
          },
          toggleTheme: state => {
               if(state.currentTheme === LIGHT){ 
                    state.currentTheme = DARK 
               }
               else if(state.currentTheme === DARK){
                    state.currentTheme = LIGHT
               }
               else {
                    state.currentTheme = LIGHT
               }
          },
     },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export const selectTheme = state => state.theme.currentTheme;

export default themeSlice.reducer;