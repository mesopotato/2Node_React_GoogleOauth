// shows a form for input the survey
import _ from 'lodash';
import React, { Component } from "react";
//reduxForm allows redux to communicate with the automatically formReducer in the redux store ..
// filed allows us to show form fields 
import { reduxForm, Field, FieldArray } from 'redux-form';
import renderField from './renderField';
import renderRecipient from './renderRecipient';
import { Link } from 'react-router-dom';
import validateEmail from '../../utils/validate/validateEmail';


// generalizing the changing attributes in the field and  iterate over this FIELDS array with help from lodash
// those attributes can be retieved form state or props ;) 
import formFIELDS from './formFIELDS';



class SurveyForm extends Component {
    renderFields() {
        // return _.map(FIELDS, field => {
        //     return <Field component={SurveyField} type="text" label={field.label}/>
        // })
        // so here we render 4 <Field/> as the FIELD array contains 4 objects 
        // directly pulling the attributes from the object is prettier (during iteration the "field will be equal to the object in the FIELD array")
        return _.map(formFIELDS, ({ label, name }) => {
            return <Field
                component={renderField}
                type="text"
                label={label}
                name={name}
                key={name} />
        })
    }


    render() {
        return (
            <div>
                {/* handlesubmit is a predefined function but if we define there a own function this will be executed */}
                <form onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}>

                    {this.renderFields()}

                    <FieldArray name="recipients" component={renderRecipient} recipients />

                    <Link to="/survey" className="red btn-flat white-text">
                        Cancel
                    </Link>

                    <button className="red btn-flat white-text" style={{ marginLeft: '10px' }} onClick={this.props.reset}>
                        reset
                    </button>

                    <button
                        type="submit"
                        className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>

                </form>
            </div>
        )
    }
}
function validate(values) {
    //contains the submit object (name, body , email etc)
    // if errors has no properties then it is valid
    const errors = {};
    console.log('loggoig values ' + JSON.stringify(values));
    // this would be repetititve 
    // if (!values.title) {
    //     errors.title = 'You must provide a name';
    // }

    _.each(formFIELDS, ({ name, label, noValueError }) => {

        // no values.name 
        if (!values[name]) {
            errors[name] = noValueError + ' ' + label;
        }
    })
    if (values.recipients !== undefined) {
        console.log('recipients are commin');
        // this is not behaving correctly as the errors are assigned not to a sttribute wich is then found in the array (no such name found)
        // error should be assigned to a error.name that exists in the values.. hmmm i fixed validation with the type "email" for now
        errors.recipients = validateEmail(values.recipients);
        console.log('error.recipients: ' + JSON.stringify(errors.recipients));
    }
    return errors;
}
//redux form is like the connect helper 
// when referencing to the same name of the form here surveForm in different components it will share the same store !! 
// so wizard form is easy 
export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    // this makes the values stick around .. else it will be dumped lleid 
    destroyOnUnmount: false,
    initialValues: {
        "recipients": [
            "add a Recipient"
          ]
      }
})(SurveyForm);