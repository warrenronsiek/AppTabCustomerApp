import {setBluetoothReconstruction, updateActiveVenue} from "../actions/venueActions";
import {Actions} from 'react-native-router-flux'
import {writeToFirehose, s3} from "../../api/aws";
import getMenu from "../../api/getMenu";
import getVenue from "../../api/getVenue";
import {menuApiQueryStatus, updateMenuItem, updateMenuRanges, updateMenuVisibility} from "../actions/menuActions";
import {get} from 'lodash'
import {imageBucket} from '../../vars'
import logger from '../../api/loggingApi'
import {stopScanning} from "../../common/bleScannerComponentFunctions";

const setActiveVenueThunk = ({venueId, address, venueName}) => (dispatch, getState) => {
  dispatch(updateActiveVenue({venueId, address, venueName}));
  dispatch(setBluetoothReconstruction(false));
  stopScanning();
  const state = getState();
  Promise.all([getMenu({venueId: state.activeVenue.venueId}), getVenue({venueId: state.activeVenue.venueId})])
    .then(res => {
      res[0].Items.forEach(item => {
        dispatch(updateMenuItem(
          item.ItemName.S,
          item.ItemDescription.S,
          item.Price.N,
          (JSON.stringify(item.Tags.SS) === JSON.stringify(['NULL'])) ? [] : item.Tags.SS,
          item.Category.S,
          item.ItemId.S,
          item.VenueId.S,
          (get(item, 'ItemOptions.S', 'NULL') !== 'NULL') ? get(item, 'ItemOptions.S') : '[]',
          item.TimeRanges.SS,
          get(item, 'ExtendedDescription.S', ''),
          s3.getSignedUrl('getObject', {
            Bucket: imageBucket,
            Key: get(item, 'Image.M.ImageUrl.S', '').split('/').slice(3).reduce((accum, str) => accum + '/' + str)
          })))
      });
      res[1].venue.Item.TimeRanges.L.forEach(timeRange =>
        dispatch(updateMenuRanges(timeRange.M.id.S, timeRange.M.range.S))
      );
      dispatch(updateMenuVisibility());
      dispatch(menuApiQueryStatus(venueId, Date.now()));
    })
    .then(() => writeToFirehose('VenueSelected'))
    .catch(err => {logger('setActiveVenueThunk failed', err)});
  Actions.nodes();

};

export {setActiveVenueThunk}