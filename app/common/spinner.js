/**
 * Created by warren on 5/9/17.
 */
import {Animated, StyleSheet, View, Easing} from 'react-native'
import React, {Component, PropTypes} from 'react'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
const AnimatedIcon = Animated.createAnimatedComponent(EvilIcon);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default class Spinner extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    size: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.width = this.props.width || 60;
    this.height = this.props.height || 50;
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin()
  }

  spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {toValue: 1, duration: 4000, easing: Easing.linear}).start(() => this.spin());
  };

  render() {
    const spin = this.spinValue.interpolate({inputRange: [0,1], outputRange: ['0deg', '360deg']});
    return (
      <View style={styles.container}>
        <AnimatedIcon name='spinner-2' size={this.props.size ? this.props.size : 60}
                      style={[styles.spinStyle, {transform: [{rotate: spin}]}, {height: this.height, width: this.width}]}/>
      </View>
    )
  }
}