import React from 'react'
import {View} from 'react-native'
import Proptypes from 'prop-types'
import Svg, {Path} from 'react-native-svg'

const Home = ({fill, width, height}) => (
  <View style={{alignItems: 'center', justifyContent: 'center'}}>
    <Svg viewBox="0 0 517.1 288.2" width={width} height={height}>
      <Path fill={fill ? fill : '#4d4d4d'} d="M153.5,144.3c0-8.3-6.7-15-15-15H47.5c-0.6,0-1.1,0.1-1.6,0.2L36.2,24c0-0.4-0.1-0.9-0.2-1.3
	C34.2,14.7,27,1,11.2,0C5.4-0.3,0.4,4.1,0,9.8c-0.4,5.8,4,10.8,9.8,11.1c3.4,0.2,5,4.4,5.5,5.8l11,120.3c0,0.2,0.1,0.4,0.1,0.6
	c0,0.2-0.1,0.4-0.1,0.6L14.2,276.7c-0.5,5.8,3.7,10.9,9.5,11.5c0.3,0,0.7,0,1,0c5.4,0,9.9-4.1,10.5-9.5l11.3-119.5
	c0.3,0,0.7,0.1,1,0.1h75.7l11,119.4c0.5,5.4,5.1,9.5,10.5,9.5c0.3,0,0.7,0,1,0c5.8-0.5,10-5.7,9.5-11.4l-11-118.5
	C149.6,155.9,153.5,150.6,153.5,144.3z M346.8,26.2H170.3c-5.8,0-10.5,4.7-10.5,10.5c0,5.8,4.7,10.5,10.5,10.5H248v200l-54,11.9
	c-5.7,1.2-9.3,6.9-8,12.5c1.2,5.7,6.8,9.2,12.5,8l60-13.2l60,13.2c0.8,0.2,1.5,0.2,2.3,0.2c4.8,0,9.2-3.4,10.3-8.3
	c1.2-5.7-2.3-11.3-8-12.5l-54-11.9v-200h77.7c5.8,0,10.5-4.7,10.5-10.5C357.3,30.9,352.6,26.2,346.8,26.2z M505.9,0
	c-15.8,1-23,14.7-24.8,22.6c-0.1,0.4-0.2,0.9-0.2,1.3l-9.7,105.5c-0.5-0.1-1.1-0.2-1.6-0.2h-91.1c-8.3,0-15,6.7-15,15
	c0,6.3,3.9,11.6,9.4,13.9l-11,118.5c-0.5,5.8,3.7,10.9,9.5,11.4c0.3,0,0.7,0,1,0c5.4,0,9.9-4.1,10.5-9.5l11-119.4h75.7
	c0.4,0,0.7-0.1,1-0.1L482,278.6c0.5,5.4,5.1,9.5,10.5,9.5c0.3,0,0.7,0,1,0c5.8-0.6,10-5.7,9.5-11.5l-12.2-128.4
	c0-0.2-0.1-0.4-0.1-0.6c0-0.2,0.1-0.4,0.1-0.6l11-120.2c0.5-1.5,2.1-5.6,5.5-5.8c5.8-0.4,10.2-5.4,9.8-11.1
	C516.7,4.1,511.7-0.2,505.9,0z"/>
    </Svg></View>);

Home.propTypes = {
  fill: Proptypes.string,
  width: Proptypes.number.isRequired,
  height: Proptypes.number.isRequired
};


export default Home