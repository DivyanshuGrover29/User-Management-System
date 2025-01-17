import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HobbyState {
  hobbies: string[];
}

const initialState: HobbyState = {
  hobbies: ['Reading', 'Gaming', 'Swimming', 'Coding', 'Designing'],
};

const hobbySlice = createSlice({
  name: 'hobbies',
  initialState,
  reducers: {
    addHobby(state, action: PayloadAction<string>) {
      state.hobbies.push(action.payload);
    },
  },
});

export const { addHobby } = hobbySlice.actions;
export default hobbySlice.reducer;
