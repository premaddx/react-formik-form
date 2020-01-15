import { SUBMIT } from '../constants';

const submitAction = (data) => {
    return { type: SUBMIT, data };
}

export const submitUserInfo = (data) => dispatch => {
  dispatch(submitAction(data));  
};