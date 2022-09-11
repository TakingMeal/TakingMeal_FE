import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  FunctionComponent,
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
import { useDispatch, useSelector } from "react-redux";
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
  VictoryStack,
  VictoryContainer,
} from "victory-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { MyDiet, MyDiets } from "../redux/reducers/myDietReducer";

//핸드폰 크기 가져오기
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const MyPage: FunctionComponent<{ jumpTo: any }> = ({ jumpTo }) => {
  const myDiet = useSelector((store: Store) => {
    return store.myDiets;
  });
  const [filter, setFilter] = useState("dietList");
  const [dietList, setDietList] = useState<MyDiet[]>(myDiet[filter]);

  // 해당 Bar의 중간 지점으로 라벨을 그립니다.
  const CenteredLabel = (props: any) => {
    const { datum, scale } = props;
    const centerPos = scale.y(datum._y / 2);
    const style = { fill: "white", textAnchor: "middle" };
    // note that because your chart is horizontal,
    // the y value that you calculate informsthe x position of the label
    return <VictoryLabel {...props} x={centerPos} style={style} dx={0} />;
  };

  console.log(dietList[0].meals[0].breakfast);

  let tot = 0;

  // 칼로리 임시
  const nutrition = [
    { nutrition: "칼로리", value: 2700, avg: 2000 },
    { nutrition: "탄수화물", value: 400, avg: 500 },
    { nutrition: "단백질", value: 200, avg: 600 },
    { nutrition: "지방", value: 600, avg: 700 },
  ];

  // 비율을 구합니다.
  const getRatio = nutrition.map((nutrition) => {
    let color = nutrition.value >= nutrition.avg ? "#ef9a85" : "#45c1b0"; // 칼로리가 초과되면 차트를 빨간색으로 표시합니다.
    let bgcolor = nutrition.value >= nutrition.avg ? "#ffc163" : "#dfdfdf"; // 칼로리가 초과되면 차트배경을 주황색으로 표시합니다.
    tot = tot + nutrition.value; // 총 칼로리 계산
    return {
      nutrition: nutrition.nutrition, // 영양소 이름
      // 비율 %
      ratio:
        nutrition.value >= nutrition.avg
          ? ((nutrition.value - nutrition.avg) / nutrition.avg) * 100
          : (nutrition.value / nutrition.avg) * 100,
      maxvalue: 100, // 최대비율 100%
      // 영양소 값
      value:
        nutrition.value >= nutrition.avg
          ? nutrition.value - nutrition.avg
          : nutrition.value,
      avg: nutrition.avg, // 평균 영양소 값
      color: color, // 값의 차트 색깔
      bgcolor: bgcolor, // 값의 차트 배경 색깔
    };
  });

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerBox}>
          <View style={styles.backButton}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                jumpTo("first");
              }}
            >
              <FontAwesomeIcon name="arrow-left" color="white" size={40} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>마이페이지</Text>
          <View style={{ width: 50 }}></View>
        </View>

        <View style={styles.userBox}>
          <View style={styles.userIcon}>
            <FontAwesomeIcon5 name="user-alt" color="white" size={30} />
          </View>
          <View>
            <Text style={styles.userText}>홍길동님</Text>
            <Text style={styles.userText}>오늘 김밥은 어떠세요?</Text>
          </View>
          <FontAwesomeIcon name="gear" color="#457987" size={30} />
        </View>

        <View style={styles.dateBox}>
          <View style={styles.dateListBox}>
            <Text style={styles.dateListText}>30</Text>
            <Text style={styles.dateListText}>화</Text>
          </View>
          <View style={styles.dateListBox}>
            <Text style={styles.dateListText}>30</Text>
            <Text style={styles.dateListText}>화</Text>
          </View>
          <View style={styles.dateListBox}>
            <Text style={styles.dateListText}>30</Text>
            <Text style={styles.dateListText}>화</Text>
          </View>
          <View style={styles.dateListBox}>
            <Text style={styles.dateListText}>30</Text>
            <Text style={styles.dateListText}>화</Text>
          </View>
          <View style={styles.dateListBox}>
            <Text style={styles.dateListText}>30</Text>
            <Text style={styles.dateListText}>화</Text>
          </View>
          <View style={styles.dateListBox}>
            <Text style={styles.dateListText}>30</Text>
            <Text style={styles.dateListText}>화</Text>
          </View>
          <View style={styles.dateListBox}>
            <Text style={styles.dateListText}>30</Text>
            <Text style={styles.dateListText}>화</Text>
          </View>
        </View>

        <View style={styles.calBox}>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <Text style={styles.dateText}>🗓09월 10일</Text>
              <Text>의 섭취칼로리는</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <Text style={styles.calText}>{tot}</Text>
              <Text>kcal입니다.</Text>
            </View>
          </View>
          <View style={styles.borderLine}></View>
          <View style={styles.calChart}>
            <VictoryChart
              height={180}
              width={300}
              domainPadding={40}
              padding={{ left: 60, right: 10, top: 0, bottom: 0 }}
              horizontal
            >
              <VictoryAxis
                style={{
                  axis: { stroke: "transparent" },
                  // ticks: { stroke: "transparent" },
                  tickLabels: { fontSize: 13, padding: 5 },
                }}
              />
              <VictoryGroup>
                <VictoryGroup color="#dfdfdf">
                  <VictoryBar
                    animate={{
                      duration: 2000,
                      onLoad: { duration: 1000 },
                    }}
                    style={{ data: { fill: ({ datum }) => datum.bgcolor } }}
                    labels={({ datum }) => `${datum.avg}`}
                    cornerRadius={{ top: 10, bottom: 10 }}
                    barWidth={20}
                    data={getRatio}
                    x="nutrition"
                    y="maxvalue"
                  />
                </VictoryGroup>
              </VictoryGroup>
              <VictoryGroup>
                <VictoryGroup color="#45c1b0">
                  <VictoryBar
                    barWidth={20}
                    labels={({ datum }) => `${datum.value}`}
                    style={{
                      labels: { fill: "white" },
                      data: { fill: ({ datum }) => datum.color },
                    }}
                    labelComponent={<CenteredLabel />}
                    //verticalAnchor={"middle"}
                    cornerRadius={{ bottom: 10 }}
                    data={getRatio}
                    x="nutrition"
                    y="ratio"
                  />
                </VictoryGroup>
              </VictoryGroup>
            </VictoryChart>
          </View>
        </View>
        <View>
          <Collapse style={{ alignItems: "center" }}>
            <CollapseHeader style={styles.expandButton}>
              <View>
                <FontAwesomeIcon name="gear" color="white" size={30} />
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View style={styles.foodBox}>
                {/* <Text>펼쳤을때 보일 내용 </Text> */}
                <View style={styles.foodListBox}>
                  <Text style={styles.foodNameText}>마라탕</Text>
                  <Text style={styles.foodServingText}>1인분 (150g)</Text>
                </View>
                <View style={styles.foodListBox}>
                  <Text style={styles.foodNameText}>마라탕</Text>
                  <Text style={styles.foodServingText}>1인분 (150g)</Text>
                </View>
                <View style={styles.foodListBox}>
                  <Text style={styles.foodNameText}>마라탕</Text>
                  <Text style={styles.foodServingText}>1인분 (150g)</Text>
                </View>
                <View style={styles.foodAddBox}>
                  <Text style={styles.foodNameText}>음식 추가하기</Text>
                </View>
              </View>
            </CollapseBody>
          </Collapse>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    minHeight: SCREEN_HEIGHT,
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
    marginVertical: 10,
  },
  headerText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: "#ffc163",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  userBox: {
    width: "100%",
    height: SCREEN_HEIGHT / 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#5bcabc",
    borderRadius: 25,
    marginVertical: 10,
  },
  userIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#457987",
    borderRadius: 15,
  },
  userText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  centerText: {
    textAlign: "center",
  },
  dateBox: {
    width: "100%",
    height: SCREEN_HEIGHT / 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  dateListBox: {
    alignItems: "center",
  },
  dateListText: {
    fontSize: 20,
    fontWeight: "normal",
    color: "black",
  },
  calBox: {
    width: "100%",
    height: (SCREEN_HEIGHT / 10) * 4,
    backgroundColor: "white",
    justifyContent: "space-between",
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  borderLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    alignItems: "center",
  },
  calChart: {
    alignItems: "center",
    justifyContent: "space-evenly",
    //backgroundColor: "gray",
  },

  dateText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  calText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffc163",
  },
  calText2: {},
  subBox: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
  },

  expandButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -35,
  },
  foodBox: {
    flex: 0,
    width: SCREEN_WIDTH - 40,
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    // marginTop: -40,
    marginBottom: 30,
  },
  foodListBox: {
    width: 300,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 15,

    borderRadius: 25,
    marginVertical: 5,
  },
  foodNameText: {
    fontSize: 20,
    fontWeight: "normal",
    color: "black",
  },
  foodServingText: {
    fontSize: 15,
    fontWeight: "normal",
    color: "gray",
  },
  foodAddBox: {
    width: 300,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 15,
    borderRadius: 25,
    marginVertical: 5,
  },
});
export default MyPage;
