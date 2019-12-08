//to render different input fields 
import React from 'react';

//JSX syntax .. looks at the incomping "props" if it has a input object and pulls it out (it has because of redux-form)
export default ({input, label}) => {

    // i could also acess down in the html through this.props.label ..

//     console.log(props);
//     input:
// name: "title"
// onBlur: ƒ (event)
// onChange: ƒ (event)
// onDragStart: ƒ (event)
// onDrop: ƒ (event)
// onFocus: ƒ (event)
// value: ""
// __proto__: Object
// meta: {touched: true, active: false, asyncValidating: false, autofilled: false, dirty: false, …}
// type: "text"

    return (
        <div>
            <label>{label}</label>
            {/* again jsx syntax defines all of the objects inside --- equivalent to: onBlur={input.onBlur} onChange={input.onChange} etc.. */}
            <input {...input}/> 
        </div>
    );
};