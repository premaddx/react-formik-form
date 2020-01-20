import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import { withFormik, ErrorMessage } from 'formik';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { submitUserInfo } from '../../actions';
import * as Yup from 'yup';

const options = [
    { key: 'm', text: 'Male', value: 'male', },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

function FormComponent(props) {
    const {
        values,
        // touched,
        // errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    // console.log('inside the form component', values);
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                id="firstName"
                                name="firstName"
                                label='First name'
                                value={values.firstName}
                                placeholder='First name'
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ErrorMessage name="firstName" />
                            <Form.Input
                                fluid
                                id="lastName"
                                name="lastName"
                                label='Last name'
                                value={values.lastName}
                                placeholder='Last name'
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ErrorMessage name="lastName" />
                            <Form.Field
                                label='Gender'
                                control='select'
                                name='gender'
                                placeholder='Gender'
                                onBlur={handleBlur}
                                onChange={handleChange}
                            >
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='other'>Other</option>
                            </Form.Field>
                            <ErrorMessage name="gender" />
                        </Form.Group>
                        <Form.Group inline>
                            <label>Size</label>
                            <Form.Field
                                control='input'
                                type='radio'
                                label='Small'
                                name='size'
                                value='sm'
                                checked={values.size === 'sm'}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control='input'
                                type='radio'
                                label='Medium'
                                name='size'
                                value='md'
                                checked={values.size === 'md'}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <Form.Field
                                control='input'
                                type='radio'
                                label='Large'
                                name='size'
                                value='lg'
                                checked={values.size === 'lg'}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.TextArea
                            id="about"
                            name="about"
                            label='About'
                            value={values.about}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Tell us more about you...'
                        />
                        <ErrorMessage name="about" />
                        <Form.Checkbox
                            id="termsAndConditions"
                            name="termsAndConditions"
                            checked={values.termsAndConditions}
                            label='I agree to the Terms and Conditions'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <ErrorMessage name="termsAndConditions" />
                        <Form.Button type="submit">Submit</Form.Button>
                    </Form>
                </Grid.Column>
                <Grid.Column width={4}></Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

const mapStateToProps = state => {
    // extract the reducer which is needed by detructuring
    console.log('inside map state to props', state.formReducer);
    return state;
}
// initialize the values if these values are coming from props like - redux state
const mapPropsToValues = (props = {}) => {
    // console.log('inside the map props to values ', props);
    const { formReducer } = props;
    return ({
        ...formReducer
    });
};

const validationSchema = Yup.object({
    firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    gender: Yup.string()
        .oneOf(['male', 'female', 'other'], 'Should be one of male, female or other')
        .required('Required'),
    about: Yup.string()
        .max(100, 'Must be 100 characters or less'),
    termsAndConditions: Yup.boolean()
        .notOneOf([false], 'Please accept the terms and conditions')
        .required('Required'),
});


export default withRouter(connect(mapStateToProps,
    {
        submitUserInfo,
    })(withFormik({
        mapPropsToValues,
        validationSchema,
        handleSubmit: (values, { setSubmitting, props }) => { // pass a different function here
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                props.submitUserInfo(values);
            }, 1000);
        },
        enableReinitialize: true,
        displayName: 'UserInfoForm',
    })(FormComponent)));
