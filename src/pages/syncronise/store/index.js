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

export const getAllDeivces = createAsyncThunk(
  "sync/getAllDeivces",
  async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/tuso-api/devices?start=${data?.start}&take=${data?.take}`
    );

    return response.data;
  }
);

export const getFileterDeivces = createAsyncThunk(
  "sync/getFileterDeivces",
  async (data) => {
    let response;

    if (data.UserName && data.Status === "online") {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tuso-api/device?start=${data.start}&take=${data.take}&UserName=${data.UserName}&Status=true`
      );
    } else if (data.UserName && data.Status === "offline") {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tuso-api/device?start=${data.start}&take=${data.take}&UserName=${data.UserName}&Status=false`
      );
    } else if (!data.UserName && data.Status === "online") {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tuso-api/device?start=${data.start}&take=${data.take}&Status=true`
      );
    } else if (!data.UserName && data.Status === "offline") {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tuso-api/device?start=${data.start}&take=${data.take}&Status=false`
      );
    } else if (data.UserName && data.Status === "all") {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tuso-api/device?start=${data.start}&take=${data.take}&UserName=${data.UserName}`
      );
    } else if (!data.UserName && data.Status === "all") {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tuso-api/devices?start=${data.start}&take=${data.take}`
      );
    }

    return response.data;
  }
);

export const getDeviceByFilter = createAsyncThunk(
  "sync/getDeviceByFilter",
  async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/tuso-api/device?start=${
        data.start
      }&take=${data.take}${data.UserName ? `&UserName=${data.UserName}` : ""}${
        data.Status === "online" ? "&Status=true" : "&Status=false"
      }${data.DeviceName ? `&DeviceName=${data.DeviceName}` : ""}${
        data.PublicIP ? `&PublicIP=${data.PublicIP}` : ""
      }`
    );

    return response.data;
  }
);

const initialState = {
  data: [],
  devices: [],
};

const syncSlice = createSlice({
  name: "sync",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSyncData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getAllDeivces.fulfilled, (state, action) => {
        state.devices = action.payload;
      })
      .addCase(getFileterDeivces.fulfilled, (state, action) => {
        state.devices = action.payload;
      })
      .addCase(getDeviceByFilter.fulfilled, (state, action) => {
        state.devices = action.payload;
      });
  },
});

export default syncSlice.reducer;
