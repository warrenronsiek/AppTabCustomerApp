import React from 'react'
import PropTypes from 'prop-types'
import {FlatList, Text, StyleSheet, View, TouchableHighlight} from 'react-native'
import VenueListItem from './venueListItem'
import Spinner from '../../common/spinner'
import Ionicons from 'react-native-vector-icons/Ionicons'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey',
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
  },
  welcomeHeadline: {
    fontSize: 26,
    fontWeight: "200",
  },
  listContainer: {
    flex: 1,
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,

  },
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerContainer: {
    minHeight: 50,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  footerSubContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  }
});

const VenueList = ({venues, selectVenue, navToPolicy}) => (
  <View style={styles.container}>
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeHeadline}>Please select your venue.</Text>
    </View>
    {venues.length === 0
      ? <View style={styles.spinnerContainer}>
        <Text style={[styles.welcomeHeadline, {paddingBottom: 20}]}>Looking for nearby venues...</Text>
        <Spinner/>
      </View>
      : <View style={styles.listContainer}>
        <FlatList data={venues} keyExtractor={item => item.venueId}
                  renderItem={({item}) => <VenueListItem venueId={item.venueId}
                                                         venueName={item.venueName} address={item.address}
                                                         select={selectVenue}/>
                  }/>
      </View>}
    <View style={styles.footerContainer}>
      <TouchableHighlight onPress={() => navToPolicy()} style={{backgroundColor: 'white'}} underlayColor='white'>
        <View style={styles.footerSubContainer}>
          <Ionicons size={30} name='ios-information-circle-outline'/>
          <Text style={{paddingLeft: 10}}>Privacy Policy</Text>
        </View>
      </TouchableHighlight>
    </View>
  </View>
);

VenueList.propTypes = {
  venues: PropTypes.arrayOf(PropTypes.shape({
    venueId: PropTypes.string,
    address: PropTypes.string,
    venueName: PropTypes.string
  })).isRequired,
  selectVenue: PropTypes.func.isRequired,
  navToPolicy: PropTypes.func.isRequired
};

export default VenueList