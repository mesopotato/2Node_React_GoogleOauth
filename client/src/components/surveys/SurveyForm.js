// shows a form for input the survey
import React, { Component } from "react";
//reduxForm allows redux to communicate with the automatically formReducer in the redux store ..
// filed allows us to show form fields 
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';


class SurveyForm extends Component {
    renderFields() {
        return (
            <div>
                <Field
                    type="text"
                    name="title"
                    component={SurveyField}
                    label="Survey Title"
                />
                <Field
                    type="text"
                    name="subject"
                    component={SurveyField}
                    label="Subject Line"
                />
                <Field
                    type="text-area"
                    name="body"
                    component={SurveyField}
                    label="Email Body "
                />
                <Field
                    type="text"
                    name="recipients"
                    component={SurveyField}
                    label="Recipients list"
                />
            </div>
        )
    }

    render() {
        return (
            <div>
                {/* handlesubmit is a predefined function but if we define there a own function this will be executed */}
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>

                    {this.renderFields()}

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
//redux form is like the connect helper 
export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);