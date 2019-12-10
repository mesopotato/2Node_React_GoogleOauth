//Survey NEw shows the form and the review
import React, { Component } from "react";
import SurveyForm from './SurveyForm';
import SurveryReview from './SurveyReview';

class NewSurvey extends Component {
    // constructor(props){
    //     super(props);

    //     this.state = { new : true};
    // }

    state = { showReview : false};

    renderContent() {
        if (this.state.showReview === true) {
            return <SurveryReview onSurveyEdit={() => this.setState({showReview: false})}/>
        } else {
            return ( <SurveyForm onSurveySubmit={() => this.setState({showReview: true})}
            /> 
            );
        }
    }

    render () {
        return (
            <div>
                
                {this.renderContent()}
            </div>
        )
    }
}
export default NewSurvey;