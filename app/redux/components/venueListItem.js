import React from 'react'
import PropTypes from 'prop-types'
import {Text, StyleSheet, TouchableHighlight, View} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Evil from 'react-native-vector-icons/EvilIcons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 120,
    flexDirection: 'column'
  },
  touchableSubContainer: {
    flex:1, flexDirection:'row'
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  nameStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 3
  },
  addressStyle: {

  }

});

const VenueListItem = ({venueId, venueName, address, select}) => (
  <TouchableHighlight onPress={() => select({venueId, venueName, address})} style={styles.container}>
    <View style={styles.touchableSubContainer}>
      <View style={styles.iconContainer}>
        <Entypo name='location-pin' size={40}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameStyle}>{venueName}</Text>
        <Text>{address}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Evil name='chevron-right' size={60} color='#fb6821'/>
      </View>
    </View>
  </TouchableHighlight>
);

VenueListItem.propTypes = {
  venueId: PropTypes.string.isRequired,
  venueName: PropTypes.string.isRequired,
  address: PropTypes.string,
  select: PropTypes.func.isRequired
};

export default VenueListItem