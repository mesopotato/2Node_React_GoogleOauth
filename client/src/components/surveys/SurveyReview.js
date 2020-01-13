import React, { Component } from "react";
import { connect } from 'react-redux';
import formFIELDS from './formFIELDS';

//importing the action creators to send the form to backend for expample submitSurvey in actions/index
import * as actions from '../../actions';

// to pass the react router infos to the nested component.. $
// to then redirect out of a nested component without the <Link> Tag
import {withRouter} from 'react-router-dom';
 
import _ from 'lodash';

//pulling in the formValues and the action creators as props (pulled from the redux store down in the connect function )
const SurveyReview = ({ onSurveyEdit, formValues, submitSurvey, history }) => {

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
            <button
                type="button"
                title="Submit Review"
                className="green darken-3 btn-flat  white-text right"
                // like this its executed immediately
                // onClick={submitSurvey(formValues)}
                // like this it waits until chlickted wtf 
                onClick={() => submitSurvey(formValues, history)}
            >Send Survey 
                        <i className="material-icons right">email</i>
            </button>

        </div>
    )

}

function mapStateToProps(state) {
    console.log(state)
    // the returned values are then assigned as props
    return { formValues: state.form.surveyForm.values };
}
// here we map the state to props with redux and we import the actions as props 
export default connect(mapStateToProps, actions)(withRouter(SurveyReview));