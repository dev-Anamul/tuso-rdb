/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { process.env.REACT_APP_API_URL } from "../../../config";
import { getSingTicketData } from "../../tickets/store";

export const getMessageData = createAsyncThunk(
  "messageData/getMessageData",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/tuso-api/messages`
    );
    console.log(response.data);
    return response.data;
  }
);

export const addMessageData = createAsyncThunk(
  "messageData/addMessageData",
  async (data, { dispatch }) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/tuso-api/message`, data);
    await dispatch(getMessageData());
    await dispatch(getSingTicketData(data.incidentID));
  }
);

export const updateMessageData = createAsyncThunk(
  "messageData/updateMessageData",
  async (data, { dispatch }) => {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/tuso-api/message/${data.oid}`,
      data
    );
    await dispatch(getMessageData());
  }
);

export const deleteMessage = createAsyncThunk(
  "messageData/deleteMessage",
  async (id, { dispatch }) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/tuso-api/message/${id}`
    );
    await dispatch(getMessageData());
  }
);

const initialState = {
  data: [],
};

const messageDataSlice = createSlice({
  name: "messageData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessageData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default messageDataSlice.reducer;
