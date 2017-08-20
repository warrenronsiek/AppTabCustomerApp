import OptionsList from '../components/optionsList'
import {connect} from 'react-redux'
import {menuItemOptionsUpdateThunk, finishedMenuItemOptionsSelectionThunk} from '../middleware/menuItemOptionsThunk'

const mapStateToProps = state => ({
  optionSets: state.activeMenuItem.itemOptions
});

const mapDispatchToProps = dispatch => ({
  onSelection: (optionSetName, optionName) => dispatch(menuItemOptionsUpdateThunk(optionSetName, optionName)),
  done: () => dispatch(finishedMenuItemOptionsSelectionThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsList)