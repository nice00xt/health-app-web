import moment from 'moment';
import { reverse, isEmpty } from 'lodash';

export const validateDate = (data) => {

  if (!isEmpty(data)) {
    const dataList = reverse(data);
    const currentDate = moment().format('MMMM/DD/YYYY');
    const lastItemDate = moment(dataList[0].created_at).format('MMMM/DD/YYYY');
    const validDate = lastItemDate === currentDate;
    return validDate;
  } else {
    return false;
  }

}