import OptionsList from '../components/optionsList'
import {connect} from 'react-redux'
import {menuItemOptionsUpdateThunk, finishedMenuItemOptionsSelectionThunk} from '../middleware/menuItemOptionsThunk'
import {decrementActiveItemCount, incrementActiveItemCount} from "../actions/menuActions";

const mapStateToProps = state => ({
  optionSets: state.activeMenuItem.itemOptions,
  allOptionsSelected: state.activeMenuItem.allOptionsSelected,
  itemName: state.activeMenuItem.itemName,
  extendedDescription: state.activeMenuItem.extendedDescription,
  imageUrl: state.activeMenuItem.imageUrl,
  count: state.activeMenuItem.count
});

const mapDispatchToProps = dispatch => ({
  onSelection: (optionSetId, optionId) => dispatch(menuItemOptionsUpdateThunk(optionSetId, optionId)),
  done: () => dispatch(finishedMenuItemOptionsSelectionThunk()),
  incrementCount: () => dispatch(incrementActiveItemCount()),
  decrementCount: () => dispatch(decrementActiveItemCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsList)