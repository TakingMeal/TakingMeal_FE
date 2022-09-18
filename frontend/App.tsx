import React, { useState } from "react";
import { Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Map from "./screens/Map";
import MyPage from "./screens/MyPage";
import SearchMeal from "./screens/SearchMeal";
import AddMeal from "./screens/AddMeal";
import MyInformation from "./screens/MyInformation";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const App = () => {
  const [swipe, setSwipe] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first" },
    { key: "second" },
    { key: "myInformation" },
    { key: "searchMeal" },
    { key: "addMeal" },
  ]);

  const scene = SceneMap({
    first: Map,
    second: MyPage,
    searchMeal: SearchMeal,
    addMeal: AddMeal,
    myInformation: MyInformation,
  });

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={scene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        swipeEnabled={swipe}
        renderTabBar={() => {
          return <></>;
        }}
        onSwipeEnd={() => {
          index === 0 ? setSwipe(false) : setSwipe(false);
        }}
      />
      <Toast />
    </>
  );
};

export default App;
