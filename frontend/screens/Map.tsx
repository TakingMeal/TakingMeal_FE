import Geolocation from '@react-native-community/geolocation'
import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  FunctionComponent,
  useCallback,
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
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import { shallowEqual, useSelector } from 'react-redux'
import { Location, Locations } from '../redux/reducers/locationsReducer'

const LocationModal: FunctionComponent<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  location: Location
  filter: string
}> = ({ open, setOpen, location, filter }) => {
  const [comment, setComment] = useState('')

  const translateY = new Animated.Value(0)
  const modalUp = Animated.timing(translateY, {
    toValue: -180,
    duration: 500,
    useNativeDriver: true,
  })

  const submitHandler = useCallback(() => {
    console.log(comment)
    setComment('')
  }, [comment])

  return (
    <Modal
      isVisible={open}
      onBackdropPress={() => {
        setOpen(false)
        setComment('')
      }}
      onBackButtonPress={() => {
        setOpen(false)
        setComment('')
      }}
      backdropOpacity={0.4}
      animationInTiming={500}
      animationOutTiming={500}
      style={{ margin: 0, flex: 1, justifyContent: 'flex-end' }}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <Animated.View
        style={[styles.modal, { transform: [{ translateY: translateY }] }]}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 1,
            height: 95,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={{ fontSize: 14, color: 'grey', marginBottom: -5 }}>
              {filter === 'goodInfluence' ? '?????? ?????????' : '?????? ?????????'}
            </Text>
            <Text style={{ fontSize: 30 }}>{location.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              modalUp.start()
            }}
          >
            <FontAwesomeIcon name="heart-o" size={40} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', height: 80, padding: 20 }}>
          <MaterialIcon name="location-on" size={28} color="#D4D4D4" />
          <Text style={{ fontSize: 18 }}>{location.address}</Text>
        </View>

        <ScrollView style={{ width: '100%' }}>
          {[...Array(50).keys()].map((comment) => {
            return (
              <View
                key={comment}
                style={{
                  height: 80,
                  width: '100%',
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              >
                <Text>{comment}?????? ??????</Text>
              </View>
            )
          })}
        </ScrollView>
      </Animated.View>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: 80,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'lightgrey',
            height: 40,
            width: '90%',
            borderRadius: 10,
          }}
        >
          <TextInput
            placeholder="????????? ???????????????."
            value={comment}
            onChangeText={(text) => {
              setComment(text)
            }}
            onSubmitEditing={submitHandler}
          />
        </View>
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
  const [filter, setFilter] = useState('schoolLunch')
  const [location, setLocation] = useState<Location>()
  const [search, setSearch] = useState('')
  const [result, setResult] = useState<Location[]>([])

  const map = useRef<any>(null)
  const list = useRef<any>(null)

  const opacity = new Animated.Value(0)
  const Intro = Animated.timing(opacity, {
    toValue: 1,
    duration: 500,
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
            {filter === 'goodInfluence' ? '?????? ?????????' : '?????? ?????????'}
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
    setSearch('')
    setResult([])
    location && setLocation(locations[filter][0])
    map.current.animateToRegion({
      latitude: locations[filter][0].lat,
      longitude: locations[filter][0].lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
    filter !== 'sharedRefrigerator' &&
      list.current.scrollToIndex({
        animated: true,
        index: 0,
        viewPosition: 0.5,
      })
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
                    filter !== 'sharedRefrigerator' &&
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
                    filter !== 'sharedRefrigerator' &&
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
        <View
          style={{
            width: 50,
            height: '100%',
            backgroundColor: 'yellow',
            borderRadius: 12,
          }}
        ></View>
        <TextInput
          style={[styles.input]}
          placeholder={
            filter === 'sharedRefrigerator'
              ? '?????? ???????????? ???????????? ??? ????????????.'
              : filter === 'goodInfluence'
              ? `?????? ????????? ??????`
              : `?????? ????????? ??????`
          }
          placeholderTextColor={
            filter === 'sharedRefrigerator' ? 'red' : 'grey'
          }
          value={search}
          editable={filter !== 'sharedRefrigerator'}
          selectTextOnFocus={filter !== 'sharedRefrigerator'}
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
          <View
            style={[
              styles.filterIconContainer,
              filter === 'schoolLunch'
                ? { backgroundColor: 'white' }
                : { backgroundColor: '#A4A4A4' },
            ]}
          >
            <Ionicon
              name="card"
              color={filter === 'schoolLunch' ? '#A4A4A4' : 'white'}
              size={15}
            />
          </View>
          <Text style={[filter === 'schoolLunch' && { color: 'white' }]}>
            ?????? ?????????
          </Text>
        </TouchableOpacity>
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
          <View
            style={[
              styles.filterIconContainer,
              filter === 'goodInfluence'
                ? { backgroundColor: 'white' }
                : { backgroundColor: '#A4A4A4' },
            ]}
          >
            <FontAwesome5Icon
              name="hand-holding-heart"
              color={filter === 'goodInfluence' ? '#A4A4A4' : 'white'}
              size={15}
            />
          </View>
          <Text style={[filter === 'goodInfluence' && { color: 'white' }]}>
            ?????? ?????????
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (filter !== 'sharedRefrigerator') {
              setSearch('')
              setFilter('sharedRefrigerator')
            }
          }}
          style={[
            styles.filter,
            filter === 'sharedRefrigerator' && { backgroundColor: '#A4A4A4' },
          ]}
        >
          <View
            style={[
              styles.filterIconContainer,
              filter === 'sharedRefrigerator'
                ? { backgroundColor: 'white' }
                : { backgroundColor: '#A4A4A4' },
            ]}
          >
            <EntypoIcon
              name="classic-computer"
              color={filter === 'sharedRefrigerator' ? '#A4A4A4' : 'white'}
              size={15}
            />
          </View>
          <Text style={[filter === 'sharedRefrigerator' && { color: 'white' }]}>
            ?????? ?????????
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* List */}
      {filter !== 'sharedRefrigerator' && (
        <>
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
            <LocationModal
              open={modal}
              setOpen={setModal}
              location={location}
              filter={filter}
            />
          )}
        </>
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
    width: '100%',
    height: '70%',
    position: 'absolute',
    bottom: -100,
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
  input: { width: 260, fontSize: 15, marginHorizontal: 5 },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterContainer: {
    position: 'absolute',
    top: 94,
    left: 25,
    height: 32,
    flexDirection: 'row',
  },
  filterIconContainer: {
    borderRadius: 90,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
  },
  filter: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
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
