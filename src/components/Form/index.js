import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import { withFormik, ErrorMessage } from 'formik';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as Yup from 'yup';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
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
    console.log('The form values are', values);
    // console.log('errors are', errors);
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
                            <ErrorMessage name="firstName"/>
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
                            <ErrorMessage name="lastName"/>
                            <Form.Select
                                fluid
                                id="gender"
                                name="gender"
                                label='Gender'
                                value={values.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                options={options}
                                placeholder='Gender'
                            />
                            {/* <ErrorMessage name="gender"/> */}
                        </Form.Group>
                        {/* <Form.Group inline>
                                <label>Size</label>
                                <Form.Radio
                                    label='Small'
                                    value='sm'
                                    checked={value === 'sm'}
                                    onChange={this.handleChange}
                                />
                                <Form.Radio
                                    label='Medium'
                                    value='md'
                                    checked={value === 'md'}
                                    onChange={this.handleChange}
                                />
                                <Form.Radio
                                    label='Large'
                                    value='lg'
                                    checked={value === 'lg'}
                                    onChange={this.handleChange}
                                />
                            </Form.Group> */}
                        <Form.TextArea
                            id="about"
                            name="about"
                            label='About'
                            value={values.about}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Tell us more about you...'
                        />
                        <ErrorMessage name="about"/>
                        <Form.Checkbox
                            id="termsAndConditions"
                            name="termsAndConditions"
                            checked={values.termsAndConditions}
                            label='I agree to the Terms and Conditions'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <ErrorMessage name="termsAndConditions"/>
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
    return state;
}
// initialize the values if these values are coming from props like - redux state
const mapPropsToValues = (props = {}) => {
    console.log('inside the map props to values ', props);
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
    // gender: Yup.string()
    //   .oneOf(['male', 'female', 'other'], 'Should be one of male, female or other')
    //   .required('Required'),
    about: Yup.string()
      .max(100, 'Must be 100 characters or less'),
    termsAndConditions: Yup.boolean()
      .notOneOf([false], 'Please accept the terms and conditions')
      .required('Required'),
  });


export default withRouter(connect(mapStateToProps, {})(withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit: (values, { setSubmitting }) => { // pass a different function here
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 1000);
    },
    enableReinitialize: true,
    displayName: 'UserInfoForm',
})(FormComponent)));