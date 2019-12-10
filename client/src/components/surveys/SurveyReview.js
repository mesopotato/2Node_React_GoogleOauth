import React, { Component } from "react";
import { connect } from 'react-redux';


const SurveyReview = ({ onSurveyEdit, formValues }) => {



    return (
        <div>
            <h3>review that shit</h3>
            <div>
                <div>
                    <label>Survey Title</label>
                    <h2>{formValues.title}</h2>
                </div>
                <div>
                    <label>Survey Subject</label>
                    <h2>{formValues.subject}</h2>
                </div>
                <div>
                    <label>Email body </label>
                    <h2>{formValues.body}</h2>
                </div>
                {formValues.recipients.map((recipient, index) => (
                    <div>
                        <label key={`label${index}`}>Recipients</label>
                        <h2 key={`recipient${index}`}>{recipient}</h2>
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
    // the returned values are then assigned as props
    return { formValues: state.form.surveyForm.values };
}
export default connect(mapStateToProps)(SurveyReview);