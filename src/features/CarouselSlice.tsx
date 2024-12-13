import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CarouselState {
  currentIndex: number;
}

const initialState: CarouselState = {
  currentIndex: 0,
};

const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    setIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    moveNext: (state) => {
      state.currentIndex += 1;
    },
    movePrev: (state) => {
      state.currentIndex -= 1;
    },
  },
});

export const { setIndex, moveNext, movePrev } = carouselSlice.actions;
export default carouselSlice.reducer;
