
import {connect} from 'react-redux'
import drawerList from '../components/drawerList'
import logoutThunk from '../middleware/logoutThunk'

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  logoutThunk: () => dispatch(logoutThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(drawerList)
