import React from 'react'
import {View, Platform} from 'react-native'
import Proptypes from 'prop-types'
import Svg, {Path} from 'react-native-svg'

const Order = ({fill, width, height}) => (
  <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 6, marginTop: Platform.OS === 'IOS' ? 6 : 12, }}>

    <Svg viewBox="0 0 325.6 324" width={width} height={height}>
      <Path fill={fill ? fill : '#4d4d4d'} d="M307.6,40.1c-14.4-5.6-30.8,1.6-36.4,16l-4.7,12l0,0L260.8,83V8.5c0-4.7-3.8-8.5-8.5-8.5H8.5C3.8,0,0,3.8,0,8.5
	v307c0,4.7,3.8,8.5,8.5,8.5h243.7c4.7,0,8.5-3.8,8.5-8.5v-35c0-4.7-3.8-8.5-8.5-8.5c-4.7,0-8.5,3.8-8.5,8.5V307H17.1V17.1h226.7
	v109.9l-30.7,78.9v-1.6H50.8v10.2h159l-5,12.9l6.9,45.8H50.8v10.2h162.3v-0.6l0,0.2l44-35.3L319,88.5l0,0l4.7-12
	C329.3,62,322.1,45.7,307.6,40.1z M226.8,250.2l-1.4-0.6l-2.7-17.7l18.1,7L226.8,250.2z M247,226.7l-20.6-8l32.9-84.8
	c0.7-1,1.2-2.2,1.4-3.5l15.6-40.2l20.6,8L247,226.7z M307.8,70.3l-4.7,12l-20.6-8l4.7-12c2.2-5.7,8.6-8.5,14.3-6.3
	C307.1,58.2,310,64.6,307.8,70.3z M50.8,145.5h162.3v-10.2H50.8V145.5z M213.1,66.4H50.8v10.2h162.3V66.4z"/>
    </Svg>
  </View>);

Order.propTypes = {
  fill: Proptypes.string,
  width: Proptypes.number.isRequired,
  height: Proptypes.number.isRequired
};


export default Order