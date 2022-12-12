import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTicketLifecycle = createAsyncThunk(
  "ticketLifecycle/getTicketLifecycle",
  async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/tuso-api/IncidentsList?start=${
        data?.start
      }&take=${data?.take}&Status=${data?.Status}${
        data.TicketNo ? `&TicketNo=${data?.TicketNo}` : ""
      }`
    );

    return response.data;
  }
);

export const getTicketLifecycleFilter = createAsyncThunk(
  "ticketLifecycle/getTicketLifecycleFilter",
  async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/tuso-api/IncidentsList?start=${data?.start}&take=${data?.take}&Status=${data?.Status}&FromDate=${data?.FromDate}&ToDate=${data?.ToDate}&TicketNo=${data?.TicketNo}&Facilty=${data?.Facilty}`
    );

    return response.data;
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const ticketLifecycleSlice = createSlice({
  name: "ticketLifecycle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTicketLifecycle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTicketLifecycle.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getTicketLifecycle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default ticketLifecycleSlice.reducer;

// ("https://localhost:7026/tuso-api/IncidentsList?start=0&take=10&Status=1&FromDate=2022-12-01&ToDate=2022-12-12&TicketNo=2&Facilty=1");
