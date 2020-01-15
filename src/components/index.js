import React from 'react';
import Form from './Form';
import Button from './Button';
import FormikForm from './FormikForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function Routes() {
    return (
        <Router>
          <Switch>
            <Route path='/form'>
              <Form />
            </Route>
            <Route path='/button'>
              <Button />
            </Route>
            <Route exact path='/formik-form'>
              <FormikForm />
            </Route>
            {/* Default path */}
            <Route exact path='/'>
              <div className="App">
                <header className="App-header">
                    Hello World!
                </header>
              </div>
            </Route>
          </Switch>
        </Router>
      );
}