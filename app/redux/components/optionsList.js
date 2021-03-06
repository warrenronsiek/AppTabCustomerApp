import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, Image, SectionList, Dimensions, ScrollView, TouchableHighlight} from 'react-native'
import OptionsListItem from './optionsListItem'
import Button from '../../common/button'
import centsIntToString from '../../common/centsIntToString'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white'
  },
  sectionHeader: {
    minHeight: 30,
    minWidth: width,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    backgroundColor: 'white'
  },
  headerText: {
    paddingLeft: 20,
    fontWeight: 'bold',
    fontSize: 18
  },
  itemNameContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    width: width,
  },
  itemName: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 20
  },
  listContainer: {
    flex: 2,
    borderBottomColor: 'grey'
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'green',
    flexDirection: 'column',
    minWidth: width
  },
  extendedDescription: {},
  extendedDescriptionContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    width: width,
    marginBottom: 10
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20
  },
  countContainer: {
    borderWidth: 1,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 7,
  },
  count: {
    fontWeight: '100',
    fontSize: 18
  },
  scrollContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: 'white'
  },
  doneButtonContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 30,
    flexDirection: 'row',
    flex: 1,
    marginBottom: 30,
  }
});

const disable = (allOptionsSelected, optionSets) => {
  if (optionSets.length === 0) {
    return false
  } else {
    return !allOptionsSelected
  }
};

const OptionSetHeader = ({optionSetName}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.headerText}>{optionSetName}</Text>
  </View>
);

class optionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {imageSize: {width: 0, height: 0}, imageRef: {}}
  }

  componentWillMount() {
    Image.getSize(this.props.imageUrl, (width, height) => this.setState({imageSize: {width, height}}));
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={{maxHeight: this.state.imageSize.height}}>
            <Image source={{uri: this.props.imageUrl}}
                   style={{height: this.state.imageSize.height, width: width}}/>
          </View>
          <View style={styles.itemNameContainer}>
            <Text style={styles.itemName}>{this.props.itemName}</Text>
          </View>
          <View style={styles.extendedDescriptionContainer}>
            <Text style={styles.extendedDescription}>{(this.props.extendedDescription === 'NULL') ? null : this.props.extendedDescription }</Text>
          </View>
          <View style={styles.listContainer}>
            <SectionList sections={this.props.optionSets}
                         keyExtractor={(item, index) => item.optionSetName + item.optionName}
                         renderItem={({item}) => <OptionsListItem optionName={item.optionName}
                                                                  isSelected={item.isSelected}
                                                                  price={'+$' + centsIntToString(item.price)}
                                                                  onSelection={this.props.onSelection}
                                                                  optionSetId={item.optionSetId}
                                                                  optionId={item.optionId}/>}
                         renderSectionHeader={({section}) => <OptionSetHeader optionSetName={section.optionSetName}/>}
                         style={{flex: 1}}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={() => this.props.decrementCount()} underlayColor='white'>
              <View style={[styles.countContainer, {backgroundColor: 'lightgrey', borderWidth: 0}]}>
                <MaterialIcon name='minus' size={30} color='white'/>
              </View>
            </TouchableHighlight>
            <View style={styles.countContainer}><Text style={styles.count}>{this.props.count}</Text></View>
            <TouchableHighlight onPress={() => this.props.incrementCount()}  underlayColor='white'>
              <View style={[styles.countContainer, {backgroundColor: 'lightgrey', borderWidth: 0}]}>
                <MaterialIcon name='plus' size={30} color={'white'}/>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.doneButtonContainer}>
            <Button onPress={() => this.props.done()} style={{width: '90%'}} title="Add to Order"
                    disabled={disable(this.props.allOptionsSelected, this.props.optionSets)}/>
          </View>
        </View>
      </ScrollView>
    )
  }
}

optionsList.propTypes = {
  optionSets: PropTypes.arrayOf(
    PropTypes.shape({
      optionsListItem: PropTypes.shape({
        optionSetName: PropTypes.string.isRequired,
        optionSetId: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(
          PropTypes.shape({
            optionName: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            isSelected: PropTypes.bool.isRequired,
            optionSetId: PropTypes.string.isRequired,
            optionId: PropTypes.string.isRequired
          })
        )
      })
    })
  ),
  imageUrl: PropTypes.string,
  extendedDescription: PropTypes.string,
  onSelection: PropTypes.func.isRequired,
  done: PropTypes.func.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired
};


export default optionsList