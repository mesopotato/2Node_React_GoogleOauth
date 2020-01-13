import React from 'react';
import renderField from './renderField';
import { Field } from 'redux-form';
//import validate from '../../utils/validate';


export default ({ fields, meta: { error } }) => {
    return (
        <ul>
            
            <li>
                <button type="button" className="teal btn-flat left white-text" onClick={() => fields.push() }>
                    Add Recipient
                    <i className="material-icons left">add</i>
                </button>
            </li>
            {fields.map((recipient, index) => (
                <li key={index}>
                    <button
                        type="button"
                        title="Remove recipient"
                        className="red btn-flat white-text"
                        onClick={() => fields.remove(index)}
                    >Remove recipient 
                        <i className="material-icons left">remove_circle</i>
                    </button>
                    <Field
                        name={recipient}
                        type="email"
                        component={renderField}
                        noValueError='Please Provide at least one recipient'
                        label={`Recipient #${index + 1}`}
                    />
                </li>
            ))}
            {error && <li className="error">{error}</li>}
        </ul>
    )
}