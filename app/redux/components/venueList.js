import React from 'react'
import PropTypes from 'prop-types'
import {FlatList, Text, StyleSheet, View} from 'react-native'
import VenueListItem from './venueListItem'

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
    borderTopWidth: StyleSheet.hairlineWidth
  },
  listStyle: {}
});

const VenueList = ({venues, selectVenue}) => (
  <View style={styles.container}>
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeHeadline}>Please select your venue.</Text>
    </View>
    <View style={styles.listContainer}>
      <FlatList data={venues} keyExtractor={item => item.venueId}
                renderItem={({item}) => <VenueListItem venueId={item.venueId}
                                                       venueName={item.venueName} address={item.address}
                                                       select={selectVenue}/>}/>
    </View>
  </View>
);

VenueList.propTypes = {
  venues: PropTypes.arrayOf(PropTypes.shape({
    venueId: PropTypes.string,
    address: PropTypes.string,
    venueName: PropTypes.string
  })).isRequired,
  selectVenue: PropTypes.func.isRequired
};

export default VenueList