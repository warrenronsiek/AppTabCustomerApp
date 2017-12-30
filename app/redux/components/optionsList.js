import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, Image, SectionList, Dimensions, Platform} from 'react-native'
import OptionsListItem from './optionsListItem'
import Button from '../../common/button'
import centsIntToString from '../../common/centsIntToString'

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
    fontWeight: '100'
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
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    width: width
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
    console.log(Platform.OS)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{maxHeight: this.state.imageSize.height}}>
          <Image source={{uri: this.props.imageUrl}}
                 style={{height: this.state.imageSize.height, width: width}} />
        </View>
        <View style={styles.itemNameContainer}>
          <Text style={styles.itemName}>{this.props.itemName}</Text>
        </View>
        <View style={styles.extendedDescriptionContainer}>
          <Text style={styles.extendedDescription}>{this.props.extendedDescription}</Text>
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
        <View>

        </View>
        <View style={[styles.container, {marginTop: 30, flexDirection: 'row', flex: 1}]}>
          <Button onPress={() => this.props.done()} style={{width: '90%'}} title="Done"
                  disabled={disable(this.props.allOptionsSelected, this.props.optionSets)}/>
        </View>
      </View>
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
  done: PropTypes.func.isRequired
};


export default optionsList