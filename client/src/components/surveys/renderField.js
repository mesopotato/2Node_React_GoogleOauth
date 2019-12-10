//to render different input fields 
import React from 'react';
//JSX syntax .. looks at the incomping "props" if it has a input object and pulls it out (it has because of redux-form)
// same goed for the meta object (even nested)
export default ({ input, label, type, meta: { touched, error } }) => {
    // i could also acess down in the html through this.props.label ..
    //     console.log(props);
    //     input:
    // name: "title"
    // onBlur: ƒ (event)
    // onChange: ƒ (event)
    // onDragStart: ƒ (event)
    // onDrop: ƒ (event)
    // onFocus: ƒ (event)
    // value: ""
    // __proto__: Object
    // meta: {touched: true, active: false, asyncValidating: false, autofilled: false, dirty: false, …}
    // type: "text"
    return (
        // <div>
        //     <label>{label}</label>
        //     {/* again jsx syntax defines all of the objects inside --- equivalent to: onBlur={input.onBlur} onChange={input.onChange} etc.. */}
        //     <input {...input} style={{ marginBottom: '5px' }} />
        //     <div className="red-text" style={{ marginBottom: '20px' }}>
        //         {/* meta.error is passed an run immediately but we do a if touched that it is only shown when the form field is touched */}
        //         {/* again it is destrucering : touched = true then it displaying the error */}
        //         {touched && error}
        //     </div>
        // </div>

        <div>
            <label>{label}</label>
            <div>
                <input {...input} type={type} placeholder={label} style={{ marginBottom: '5px' }} />
                <div className="red-text" style={{ marginBottom: '20px' }}>
                    { input.onBlur && touched && error && <span>{error}</span>}
                </div>
            </div>
        </div>
    );
};
