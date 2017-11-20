import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {View, PanResponder} from 'react-native'

class PanHandler extends Component {
  static propTypes = {
    styles: PropTypes.object,
    onClick: PropTypes.func,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func
  };

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log(gestureState);
        if ((gestureState.dx === 0) && (gestureState.dy === 0)) {
          this.props.onClick()
        } else if ((gestureState.dx <= 0) && (Math.abs(gestureState.dx)/ 10. >= Math.abs(gestureState.dy))) {
          this.props.onSwipeLeft()
        } else if ((gestureState.dx > 0) && (Math.abs(gestureState.dx)/ 10. >= Math.abs(gestureState.dy))) {
          this.props.onSwipeRight()
        }
      }
    })
  }

  render() {
    return (
      <View {...this._panResponder.panHandlers} style={this.props.style}>
        {this.props.children}
      </View>
    )
  }
}

export default PanHandler