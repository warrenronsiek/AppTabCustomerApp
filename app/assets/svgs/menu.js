import React from 'react'
import {View, Platform} from 'react-native'
import Proptypes from 'prop-types'
import Svg, {Path} from 'react-native-svg'

const Menu = ({fill, width, height}) => (
  <View style={{alignItems: 'center', justifyContent: 'flex-end', marginLeft: 6, marginBottom: Platform.OS === 'ios' ? -12 : 0}}>
    <Svg viewBox="0 0 517.1 288.2" width={width} height={height}>
      <Path fill={fill ? fill : '#4d4d4d'} d="M63.3,354.5h102.1v-13.1H63.3V354.5z M63.3,306h102.1v-13.1H63.3V306z M63.3,257.4h102.1v-13.1H63.3V257.4z
	 M63.3,208.8h102.1v-13.1H63.3V208.8z M63.3,163.8h102.1v-103H63.3V163.8z M371.5,60.1H269.4v13.1h102.1V60.1z M371.5,201.5H269.4
	v13.1h102.1V201.5z M371.5,154.4H269.4v13.1h102.1V154.4z M371.5,107.2H269.4v13.1h102.1V107.2z M371.5,250.8H269.4v103h102.1V250.8
	z M248,0c-14.3,0-24.6,7.1-31.5,15.7C209.6,7.1,199.3,0,185,0H0v401.5h193.7c1.6,0,2.9,1.3,2.9,2.9v18h39.8v-18
	c0-1.6,1.3-2.9,2.9-2.9h182.8l10.9-0.2V0H248z M205.6,382.7c-3.5-1.9-7.5-3-11.8-3H21.9V21.9H185c15.2,0,20.3,18.4,20.4,20.4v18h0.2
	V382.7z M411.1,379.7H239.2c-4.3,0-8.3,1.1-11.8,3V60.2h0.2v-18c0.1-2,5.1-20.4,20.4-20.4h163.1V379.7z"/>
    </Svg>
  </View>);

Menu.propTypes = {
  fill: Proptypes.string,
  width: Proptypes.number.isRequired,
  height: Proptypes.number.isRequired
};


export default Menu