import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Location {
  id: number;
  lat: number;
  lng: number;
  name?: string;
  address?: string;
}

interface Locations {
  goodInfluence: Location[];
  schoolLunch: Location[];
  [props: string]: Location[];
}

const initialState: Locations = {
  goodInfluence: [
    {
      id: 1,
      lat: 37.623718451666946,
      lng: 127.09323244316982,
      name: "서울여대",
    },
    {
      id: 2,
      lat: 37.540862164493284,
      lng: 127.07206040672003,
      name: "건국대",
    },
    {
      id: 3,
      lat: 37.6319630613234,
      lng: 127.0801748260039,
      name: "과기대",
    },
  ],
  schoolLunch: [
    {
      id: 4,
      lat: 37.46002009776054,
      lng: 126.95132954803483,
      name: "서울대",
    },
    {
      id: 5,
      lat: 37.55508155797199,
      lng: 126.92693564173828,
      name: "홍대 조폭 떡볶이",
    },
  ],
};

const locationsReducer = createSlice({
  name: "locations",
  initialState: initialState,
  reducers: {
    setLocations: (state: Locations, action: PayloadAction<Locations>) => {
      state = action.payload;
    },
  },
});

export type { Location, Locations };
export const { setLocations } = locationsReducer.actions;
export default locationsReducer.reducer;
