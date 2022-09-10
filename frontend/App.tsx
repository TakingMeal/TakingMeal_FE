import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import Map from './screens/Map'
import MyPage from './screens/MyPage'

const App = () => {
  const [swipe, setSwipe] = useState(false)
  const [index, setIndex] = useState(0)
  const [routes] = useState([{ key: 'first' }, { key: 'second' }])

  const scene = SceneMap({
    first: Map,
    second: MyPage,
  })

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={scene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      swipeEnabled={swipe}
      renderTabBar={() => {
        return <></>
      }}
      onSwipeEnd={() => {
        index === 0 ? setSwipe(false) : setSwipe(true)
      }}
    />
  )
}

export default App
