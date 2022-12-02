import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllSyncData = createAsyncThunk(
  "sync/getAllSyncData",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/tuso-api/Syncs`
    );

    return response.data;
  }
);

const initialState = {
  data: [],
};

const syncSlice = createSlice({
  name: "sync",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSyncData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default syncSlice.reducer;
