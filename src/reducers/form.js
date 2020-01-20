import { SUBMIT } from '../constants';

const initialState = {
    firstName: 'Prem',
    lastName: 'Anand',
    gender: 'male',
    size: 'sm', // S, M and L
    about: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    termsAndConditions: true,
};

export default function formReducer(state = initialState, action) {
    switch(action.type) {
        // declare the case statement and perform tasks accordingly
        case SUBMIT: {
            console.log('inside the reducer', action.data);
            return {...action.data};
        }
        default: return state;
    }
}