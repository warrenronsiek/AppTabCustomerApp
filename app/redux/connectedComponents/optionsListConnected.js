import OptionsList from '../components/optionsList'
import {connect} from 'react-redux'
import {menuItemOptionsUpdateThunk, finishedMenuItemOptionsSelectionThunk} from '../middleware/menuItemOptionsThunk'

const mapStateToProps = state => ({
  optionSets: state.activeMenuItem.itemOptions,
  price: state.activeMenuItem.viewablePrice,
  allOptionsSelected: state.activeMenuItem.allOptionsSelected
});

const mapDispatchToProps = dispatch => ({
  onSelection: (optionSetId, optionId) => dispatch(menuItemOptionsUpdateThunk(optionSetId, optionId)),
  done: () => dispatch(finishedMenuItemOptionsSelectionThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsList)