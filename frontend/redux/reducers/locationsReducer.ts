import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Location {
  id: number
  lat: number
  lng: number
  name?: string
  address?: string
}

interface Locations {
  goodInfluence: Location[]
  schoolLunch: Location[]
  sharedRefrigerator: Location[]
  [props: string]: Location[]
}

const initialState: Locations = {
  goodInfluence: [
    {
      id: 1,
      lat: 37.623718451666946,
      lng: 127.09323244316982,
      name: '서울여대',
      address: '서울특별시 어쩌구저쩌구',
    },
    {
      id: 2,
      lat: 37.540862164493284,
      lng: 127.07206040672003,
      name: '건국대',
      address: '서울특별시 어쩌구저쩌구',
    },
    {
      id: 3,
      lat: 37.6319630613234,
      lng: 127.0801748260039,
      name: '과기대',
      address: '서울특별시 어쩌구저쩌구',
    },
  ],
  schoolLunch: [
    {
      id: 4,
      lat: 37.46002009776054,
      lng: 126.95132954803483,
      name: '서울대',
      address: '서울특별시 어쩌구저쩌구',
    },
    {
      id: 5,
      lat: 37.55508155797199,
      lng: 126.92693564173828,
      name: '삼육 두유 떡볶이',
      address: '삼육대',
    },
  ],

  sharedRefrigerator: [
    { id: 1, lat: 37.2651897, lng: 127.0455615 },
    { id: 2, lat: 37.2923471, lng: 127.034194 },
    { id: 3, lat: 37.2678946, lng: 126.9910921 },
    { id: 4, lat: 37.2646752, lng: 127.0082785 },
    { id: 5, lat: 37.2410187, lng: 126.9637578 },
    { id: 6, lat: 37.2581796, lng: 127.0317248 },
    { id: 7, lat: 37.3273698, lng: 127.013534 },
    { id: 8, lat: 37.2975213, lng: 127.0281498 },
    { id: 9, lat: 37.2708224, lng: 126.9842676 },
    { id: 10, lat: 37.2771332, lng: 127.0370517 },
    { id: 11, lat: 37.3033786, lng: 127.0015598 },
    { id: 12, lat: 37.2907982, lng: 127.000014 },
    { id: 13, lat: 37.3056387, lng: 126.9958322 },
    { id: 14, lat: 37.2440174, lng: 127.0341753 },
    { id: 15, lat: 37.2753925, lng: 127.0674623 },
    { id: 16, lat: 37.2789696, lng: 126.9740907 },
    { id: 17, lat: 37.2594864, lng: 127.0079238 },
    { id: 18, lat: 37.2580787, lng: 127.0141685 },
    { id: 19, lat: 37.2449735, lng: 127.0602251 },
    { id: 20, lat: 37.2744419, lng: 127.0419661 },
    { id: 21, lat: 37.3087315, lng: 126.9914141 },
    { id: 22, lat: 37.2801849, lng: 126.9707386 },
    { id: 23, lat: 37.3021888, lng: 126.9909984 },
    { id: 24, lat: 37.2498535, lng: 127.0130127 },
    { id: 25, lat: 37.2617712, lng: 126.9812901 },
    { id: 26, lat: 37.2492377, lng: 127.034439 },
  ],
}

const locationsReducer = createSlice({
  name: 'locations',
  initialState: initialState,
  reducers: {
    setLocations: (state: Locations, action: PayloadAction<Locations>) => {
      state = action.payload
    },
  },
})

export type { Location, Locations }
export const { setLocations } = locationsReducer.actions
export default locationsReducer.reducer
