/**
 * Created by warren on 5/9/17.
 */
import {Animated, StyleSheet, View, UIManager, LayoutAnimation} from 'react-native'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
const AnimatedIcon = Animated.createAnimatedComponent(EvilIcon);

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row'
  },
  circles: {
    backgroundColor: 'black'
  }
});

const squareStyleGen = (diameter) => ({
  width: diameter,
  height: diameter,
});

export default class Spinner extends Component {

  constructor(props) {
    super(props);
    this.width = this.props.width || 70;
    this.height = this.props.height || 50;
    this.state = {squareDims: [10, 15, 20]};
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear, this.update);
  }

  update = () => {
    this.setState({squareDims: _.shuffle(this.state.squareDims)});
  };

  componentDidMount () {
    this.update()
  }

  render() {
    return (
      <View style={[styles.container, {width: this.width, height: this.height, maxHeight: this.height}]}>
            <View style={[styles.circles, squareStyleGen(this.state.squareDims[0])]}/>
            <View style={[styles.circles, squareStyleGen(this.state.squareDims[1]), {marginLeft: 5}]}/>
            <View style={[styles.circles, squareStyleGen(this.state.squareDims[2]), {marginLeft: 5}]}/>
      </View>
    )
  }
}

Spinner.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.any
};