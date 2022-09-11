import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MyDiet {
  isToday: boolean;
  weekDay: string;
  meals: any;
}

interface MyDiets {
  dietList: MyDiet[];
  [props: string]: MyDiet[]
}

// const initialState = {
//   myNutrition: [
//     { nutrition: "칼로리", value: 2500, avg: 2000 },
//     { nutrition: "탄수화물", value: 400, avg: 500 },
//     { nutrition: "단백질", value: 200, avg: 600 },
//     { nutrition: "지방", value: 600, avg: 700 },
//   ],
// };

const initialState: MyDiets = {
  dietList: [
    {
      isToday: false,
      weekDay: "월",
      meals: [
        {
          breakfast: {
            foodName: "피자",
            cal: 150,
            carbohydrate: 999,
            protein: 999,
            fat: 999,
            serving: 1,
          },
          lunch: {
            foodName: "동파육",
            cal: 150,
            carbohydrate: 999,
            protein: 999,
            fat: 999,
            serving: 1,
          },
          dinner: {
            foodName: "치킨",
            cal: 150,
            carbohydrate: 999,
            protein: 999,
            fat: 999,
            serving: 1,
          },
        },
      ],
    },
    {
      isToday: false,
      weekDay: "화",
      meals: [
        {
          breakfast: {
            foodName: "햄버거",
            cal: 150,
            carbohydrate: 999,
            protein: 999,
            fat: 999,
            serving: 1,
          },
          lunch: {
            foodName: "떡볶이",
            cal: 150,
            carbohydrate: 999,
            protein: 999,
            fat: 999,
            serving: 1,
          },
          dinner: {
            foodName: "탕수육",
            cal: 150,
            carbohydrate: 999,
            protein: 999,
            fat: 999,
            serving: 1,
          },
        },
      ],
    },
  ],
};

const myDietReducer = createSlice({
  name: "myDiets",
  initialState: initialState,
  reducers: {
    setMyDiets: (state: MyDiets, action: PayloadAction<MyDiets>) => {
      state = action.payload;
    },
  },
});

export type { MyDiet, MyDiets };
export const { setMyDiets } = myDietReducer.actions;
export default myDietReducer.reducer;
