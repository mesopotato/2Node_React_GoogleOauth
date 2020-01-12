import React, { Component } from "react";
import { connect } from 'react-redux';
import formFIELDS from './formFIELDS';

import _ from 'lodash';

//pulling in the formValues as props (pulled from the redux store down in the connect function )
const SurveyReview = ({ onSurveyEdit, formValues }) => {

    // mapping over the different field to define the values centrally.. 
    // formValues our of the redux store have the prop name of the label so i can search for them dynamically with formValues[field.name]
    //EJS 6 allows us even to pull out just the attributes that we jant by repalcing "field" by ({ label, name }) and then simply referring to them in the return statuement
    const reviewFields = _.map(formFIELDS, field => {
        return (
            <div>

                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        )
    })


    return (
        <div>
            <h3>review that shit</h3>
            <div>
                {reviewFields}

                {formValues.recipients.map((recipient, index) => (
                    <div>
                        <label key={`label${index}`}>Recipients</label>
                        <p key={`recipient${index}`}>{recipient}</p>
                    </div>
                ))}

            </div>
            <button
                type="button"
                title="Remove recipient"
                className="yellow darken-3 btn-flat  white-text"
                onClick={onSurveyEdit}
            >Edit form
                        <i className="material-icons left">remove_circle</i>
            </button>

        </div>
    )

}

function mapStateToProps(state) {
    console.log(state)
    // the returned values are then assigned as props
    return { formValues: state.form.surveyForm.values };
}
export default connect(mapStateToProps)(SurveyReview);