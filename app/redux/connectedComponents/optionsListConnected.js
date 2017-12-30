import OptionsList from '../components/optionsList'
import {connect} from 'react-redux'
import {menuItemOptionsUpdateThunk, finishedMenuItemOptionsSelectionThunk} from '../middleware/menuItemOptionsThunk'

const mapStateToProps = state => ({
  optionSets: state.activeMenuItem.itemOptions,
  allOptionsSelected: state.activeMenuItem.allOptionsSelected,
  itemName: state.activeMenuItem.itemName,
  extendedDescription: state.activeMenuItem.extendedDescription,
  imageUrl: state.activeMenuItem.imageUrl
});

const mapDispatchToProps = dispatch => ({
  onSelection: (optionSetId, optionId) => dispatch(menuItemOptionsUpdateThunk(optionSetId, optionId)),
  done: () => dispatch(finishedMenuItemOptionsSelectionThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsList)