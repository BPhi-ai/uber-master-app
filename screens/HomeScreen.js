import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw `bg-white h-full`}>
        <View style={tw `p-5`}>
            <Image
                style={{
                    width: 100, 
                    height:100, 
                    resizeMode: 'contain',
                }}
                source={{
                    uri: "https://links.papareact.com/gzs"
                }}
            />
            <GooglePlacesAutocomplete 
                placeholder='Where From?'
                styles={{
                    textInputContainer: {
                        borderTopWidth: 2,
                        borderBottomWidth: 2,
                        borderLeftWidth:2,
                        borderRightWidth:2,
                        borderRadius: 20,
                    },
                    container: {
                        flex: 0,
                        marginBottom: 5,
                    },
                    textInput: {
                        borderRadius: 20,
                        fontSize: 18,
                        marginTop: 2,
                    },
                }}
                onPress={(data, details = null) => {
                    dispatch(setOrigin({
                        location: details.geometry.location,
                        description: data.description,
                    }));

                    dispatch(setDestination(null))
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en'
                }}

                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
            />

            <NavOptions />
            <NavFavourites />
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({});