import {updateActiveVenue} from "../actions/venueActions";
import {Actions} from 'react-native-router-flux'
import {writeToFirehose, s3} from "../../api/aws";
import getMenu from "../../api/getMenu";
import getVenue from "../../api/getVenue";
import {menuApiQueryStatus, updateMenuItem, updateMenuRanges, updateMenuVisibility} from "../actions/menuActions";
import {get, reduce} from 'lodash'
import {imageBucket} from '../../vars'
import logger from '../../api/loggingApi'
import {stopScanning} from "../../common/bleScannerComponentFunctions";

const keyAccessor = item => reduce(get(item, 'Image.M.ImageUrl.S', '').split('/').slice(3), (accum, str) => accum + '/' + str);

const setActiveVenueThunk = ({venueId, address, venueName}) => (dispatch, getState) => {
  dispatch(updateActiveVenue({venueId, address, venueName}));
  stopScanning();
  const state = getState();
  Promise.all([getMenu({venueId: state.activeVenue.venueId}), getVenue({venueId: state.activeVenue.venueId})])
    .then(res => {
      res[0].Items.forEach(item => {
        let key = keyAccessor(item);
        dispatch(updateMenuItem({
          itemName:item.ItemName.S,
            itemDescription: item.ItemDescription.S,
          price: item.Price.N,
          tags: (JSON.stringify(item.Tags.SS) === JSON.stringify(['NULL'])) ? [] : item.Tags.SS,
          category: item.Category.S,
          itemId: item.ItemId.S,
          venueId: item.VenueId.S,
          itemOptions: (get(item, 'ItemOptions.S', 'NULL') !== 'NULL') ? get(item, 'ItemOptions.S') : '[]',
          timeRanges: item.TimeRanges.SS,
          extendedDescription: get(item, 'ExtendedDescription.S', ''),
          imageUrl: !!key ? s3.getSignedUrl('getObject', {
            Bucket: imageBucket,
            Key: key
          }) : null}))
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