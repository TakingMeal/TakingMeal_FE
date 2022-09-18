import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  FunctionComponent,
  useMemo,
} from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import FontAwesomeIcon5 from "react-native-vector-icons/FontAwesome5";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MeterialIcon from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { MyDiet, MyDiets, setMealInfo } from "../redux/reducers/myDietReducer";
import { TextInput } from "react-native-gesture-handler";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const MyInformation: FunctionComponent<{ jumpTo: any }> = ({ jumpTo }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerBox}>
          <View style={styles.backButton}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                jumpTo("second");
              }}
            >
              <FontAwesomeIcon name="arrow-left" color="white" size={40} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>내 정보</Text>
          <View style={{ width: SCREEN_HEIGHT / 15 }}></View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#f2f2f2",
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: SCREEN_HEIGHT / 10,
  },
  headerText: {
    fontSize: 16,
    color: "black",
    fontFamily: "LeferiBaseRegular",
  },
  backButton: {
    height: SCREEN_HEIGHT / 15,
    aspectRatio: 1 / 1, // 정사각형
    backgroundColor: "#ffc163",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default MyInformation;
