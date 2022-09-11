import Geolocation from '@react-native-community/geolocation'
import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  FunctionComponent,
} from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Octicon from 'react-native-vector-icons/Octicons'
import Modal from 'react-native-modal'
import { shallowEqual, useSelector } from 'react-redux'
import { Location, Locations } from '../redux/reducers/locationsReducer'

const LocationModal: FunctionComponent<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  location: Location
}> = ({ open, setOpen, location }) => {
  return (
    <Modal
      isVisible={open}
      onBackdropPress={() => {
        setOpen(false)
      }}
      backdropOpacity={0.4}
      animationInTiming={500}
      animationOutTiming={500}
      style={{ margin: 0, flex: 1, justifyContent: 'flex-end' }}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={[styles.modal]}>
        <Text style={{ fontSize: 30 }}>id: {location.id}</Text>
        <Text style={{ fontSize: 30 }}>name: {location.name}</Text>
        <View
          style={{
            backgroundColor: 'orange',
            width: '100%',
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              height: 40,
              width: '70%',
              borderRadius: 15,
            }}
          >
            <TextInput />
          </View>
        </View>
        <ScrollView style={{ width: '100%' }}>
          {[...Array(50).keys()].map((comment) => {
            return (
              <View
                key={comment}
                style={{
                  height: 100,
                  width: '100%',
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              >
                <Text>{comment}번째 댓글</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    </Modal>
  )
}

const Map: FunctionComponent<{ jumpTo: any }> = ({ jumpTo }) => {
  const locations = useSelector((store: Store) => {
    return store.locations
  }, shallowEqual)
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number
    lng: number
  }>()
  const [modal, setModal] = useState(false)
  const [filter, setFilter] = useState('goodInfluence')
  const [location, setLocation] = useState<Location>()
  const [search, setSearch] = useState('')
  const [result, setResult] = useState<Location[]>([])

  const map = useRef<any>(null)
  const list = useRef<any>(null)

  const opacity = new Animated.Value(0)
  const Intro = Animated.timing(opacity, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  })

  const renderItem: FunctionComponent<{
    item: Location
    index: number
  }> = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[styles.card]}
        activeOpacity={0.8}
        onPress={() => {
          map.current.animateToRegion({
            latitude: item.lat,
            longitude: item.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          })
          list.current.scrollToIndex({
            animated: true,
            index: index,
            viewPosition: 0.5,
          })
          setLocation(item)
          location === item && setModal(true)
        }}
      >
        <Image
          source={require('../img/test.png')}
          style={{ width: 70, height: 70 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 14, color: '#FFC063', marginBottom: -5 }}>
            {filter === 'goodInfluence' ? '선한 영향력' : '카드 가맹점'}
          </Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <MaterialIcon name="location-on" size={16} color="#D4D4D4" />
            <Text style={{ fontSize: 12 }}>{item.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        console.log(error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }, [])

  useEffect(() => {
    if (location) {
      setSearch('')
      setResult([])
      setLocation(locations[filter][0])
      map.current.animateToRegion({
        latitude: locations[filter][0].lat,
        longitude: locations[filter][0].lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
      list.current.scrollToIndex({
        animated: true,
        index: 0,
        viewPosition: 0.5,
      })
    }
  }, [filter])

  return (
    <>
      {/* Map */}
      <MapView
        ref={map}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.64320085782944,
          longitude: 127.10559017906716,
          // latitude: currentLocation?.lat,
          // longitude: currentLocation?.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onMapLoaded={() => {
          Intro.start()
        }}
        toolbarEnabled={false}
        zoomControlEnabled={false}
        loadingBackgroundColor="lightgray"
        loadingEnabled
      >
        {search.length > 0
          ? result.map((location) => {
              return (
                <Marker
                  pinColor="linen"
                  key={location.id}
                  coordinate={{
                    latitude: location.lat,
                    longitude: location.lng,
                  }}
                  onPress={(event) => {
                    event.preventDefault()
                    map.current.animateToRegion({
                      latitude: location.lat,
                      longitude: location.lng,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    })
                    list.current.scrollToIndex({
                      animated: true,
                      index: locations[filter].findIndex((_location) => {
                        return location.id === _location.id
                      }),
                      viewPosition: 0.5,
                    })
                  }}
                />
              )
            })
          : locations[filter].map((location) => {
              return (
                <Marker
                  pinColor="linen"
                  key={location.id}
                  coordinate={{
                    latitude: location.lat,
                    longitude: location.lng,
                  }}
                  onPress={(event) => {
                    event.preventDefault()
                    map.current.animateToRegion({
                      latitude: location.lat,
                      longitude: location.lng,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    })
                    list.current.scrollToIndex({
                      animated: true,
                      index: locations[filter].findIndex((_location) => {
                        return location.id === _location.id
                      }),
                      viewPosition: 0.5,
                    })
                  }}
                />
              )
            })}
      </MapView>

      {/* Search */}
      <Animated.View style={[styles.searchContainer, { opacity: opacity }]}>
        <TextInput
          style={[styles.input]}
          placeholder="가게 검색"
          value={search}
          onChangeText={(text) => {
            result.length > 0 &&
              list.current.scrollToIndex({
                animated: false,
                index: 0,
                viewPosition: 0.5,
              })
            setSearch(text)
            setResult(
              locations[filter].filter((location) => {
                return location.name?.includes(text)
              })
            )
          }}
        />
        <TouchableOpacity
          style={[styles.iconContainer]}
          activeOpacity={0.6}
          onPress={() => {
            search.length > 0 ? setSearch('') : jumpTo('second')
          }}
        >
          {search.length > 0 ? (
            <MaterialIcon name="cancel" color="lightgray" size={35} />
          ) : (
            <FontAwesomeIcon name="user-circle" color="lightgray" size={30} />
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Filter */}
      <Animated.View style={[styles.filterContainer, { opacity: opacity }]}>
        <TouchableOpacity
          onPress={() => {
            if (filter !== 'goodInfluence') {
              setSearch('')
              setFilter('goodInfluence')
            }
          }}
          style={[
            styles.filter,
            filter === 'goodInfluence' && { backgroundColor: '#A4A4A4' },
          ]}
        >
          <Text style={[filter === 'goodInfluence' && { color: 'white' }]}>
            선한 영향력
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (filter !== 'schoolLunch') {
              setSearch('')
              setFilter('schoolLunch')
            }
          }}
          style={[
            styles.filter,
            filter === 'schoolLunch' && { backgroundColor: '#A4A4A4' },
          ]}
        >
          <Text style={[filter === 'schoolLunch' && { color: 'white' }]}>
            카드 가맹점
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (filter !== 'sharedRefrigerator') {
              setSearch('')
              // setFilter('sharedRefrigerator')
            }
          }}
          style={[
            styles.filter,
            filter === 'sharedRefrigerator' && { backgroundColor: '#A4A4A4' },
          ]}
        >
          <Text style={[filter === 'sharedRefrigerator' && { color: 'white' }]}>
            공유 냉장고
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* List */}
      {location && search.length === 0 && (
        <Animated.View style={[styles.count]}>
          <Text style={{ color: 'white' }}>
            {locations[filter].findIndex((_location) => {
              return _location.id === location?.id
            }) + 1}{' '}
            of {locations[filter].length}
          </Text>
        </Animated.View>
      )}

      <Animated.FlatList
        ref={list}
        data={search.length > 0 ? result : locations[filter]}
        renderItem={renderItem}
        decelerationRate={0}
        snapToAlignment="center"
        horizontal
        pagingEnabled
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        style={[styles.list, { opacity: opacity }]}
      />

      {location && (
        <LocationModal open={modal} setOpen={setModal} location={location} />
      )}
    </>
  )
}

const shadow = {
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '55%',
    backgroundColor: 'white',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },

  searchContainer: {
    width: 360,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 25,
    left: 25,
    backgroundColor: 'white',
    borderRadius: 15,
    ...shadow,
  },
  input: { width: '87%', fontSize: 15 },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterContainer: {
    position: 'absolute',
    top: 92,
    left: 25,
    height: 32,
    flexDirection: 'row',
  },
  filter: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
    ...shadow,
  },

  list: {
    width: '100%',
    height: 120,
    position: 'absolute',
    bottom: 35,
  },
  card: {
    width: 300,
    height: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'white',
    ...shadow,
  },
  count: {
    width: 75,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 165,
    left: 18,
    borderRadius: 20,
    backgroundColor: '#ABABAB',
    ...shadow,
  },
})

export default Map
