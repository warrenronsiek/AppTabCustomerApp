/**
 * Created by warren on 5/14/17.
 */
import React, {PropTypes, Component} from 'react'
import {View, TouchableHighlight, Text, StyleSheet, Image} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Order from '../assets/svgs/order'


const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    width: 90,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontWeight: '100',
    fontSize: 18
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

const GenerateIcon = ({iconName, iconLibrary, iconSize, color}) => {
  switch (iconLibrary) {
    case 'Entypo':
      return <Entypo color={color} name={iconName} size={iconSize}/>;
    case 'EvilIcons':
      return <EvilIcons color={color} name={iconName} size={iconSize}/>;
    case 'FontAwesome':
      return <FontAwesome color={color} name={iconName} size={iconSize}/>;
    case 'Foundation':
      return <Foundation color={color} name={iconName} size={iconSize}/>;
    case 'Ionicons':
      return <Ionicons color={color} name={iconName} size={iconSize}/>;
    case 'MaterialIcons':
      return <MaterialIcons color={color} name={iconName} size={iconSize}/>;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons color={color} name={iconName} size={iconSize}/>;
    case 'Octicons':
      return <Octicons color={color} name={iconName} size={iconSize}/>;
    case 'Zocial':
      return <Zocial color={color} name={iconName} size={iconSize}/>;
    case 'SimpleLineIcons':
      return <SimpleLineIcons color={color} name={iconName} size={iconSize}/>;
    case 'Ben':
      return <View style={{marginTop:-3}}>
        <Order height={iconSize} width={iconSize} fill='white'/>
      </View>;
    default:
      return <Entypo color={color} name={iconName} size={iconSize}/>
  }
};

class Button extends Component {
  static propTypes = {
    title: PropTypes.string,
    iconProps: PropTypes.shape({
      iconName: PropTypes.string.isRequired,
      iconLibrary: PropTypes.oneOf(['Entypo', 'EvilIcons', 'FontAwesome', 'Foundation', 'Ionicons', 'MaterialIcons',
        'MaterialCommunityIcons', 'Octicons', 'Zocial', 'SimpleLineIcons', 'Ben']),
      iconSize: PropTypes.number.isRequired,
      iconColor: PropTypes.string
    }),
    style: PropTypes.any,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    containerStyle: PropTypes.any,
    textStyle: PropTypes.any
  };

  handleOnPress = () => {
    requestAnimationFrame(() => this.props.onPress())
  };

  render() {
    return (
      <TouchableHighlight
        onPress={!this.props.disabled ? this.handleOnPress : null}
        style={!this.props.disabled
          ? [styles.button, this.props.style]
          : [styles.button, this.props.style, {backgroundColor: 'grey'}]}
        underlayColor={'transparent'}>
        <View style={[styles.container, this.props.containerStyle]}>
          {!this.props.disabled
           ? (<Image style={[styles.container, this.props.containerStyle, {position: 'absolute', width: '100%', height: '100%'}]} source={require('../assets/images/btn-gradient.png')}>

          {this.props.iconProps
            ? <GenerateIcon iconName={this.props.iconProps.iconName}
                            iconLibrary={this.props.iconProps.iconLibrary}
                            iconSize={this.props.iconProps.iconSize}
                            color={this.props.iconProps.iconColor || 'white'}/>
            : null}
          {this.props.title ? <Text style={[styles.text, this.props.textStyle]}>{this.props.title}</Text> : null}
          </Image> )
          : (<View>
              {this.props.iconProps
            ? <GenerateIcon iconName={this.props.iconProps.iconName}
                            iconLibrary={this.props.iconProps.iconLibrary}
                            iconSize={this.props.iconProps.iconSize}
                            color={this.props.iconProps.iconColor || 'white'}/>
            : null}
          {this.props.title ? <Text style={[styles.text, this.props.textStyle]}>{this.props.title}</Text> : null}
            </View>)}
        </View>
      </TouchableHighlight>)

  }
}

export default Button