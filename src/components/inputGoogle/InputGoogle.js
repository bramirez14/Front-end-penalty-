import React from 'react'
//import './inputGoogle.css'
export const InputGoogle = ({label,tipo}) => {
    return (
        <div class="l-form">
            <div class="form__div">
                <input type={tipo} class="form__input" placeholder=" "/>
                <label for="" class="form__label">{label}</label>
            </div>
            </div>
    
    )
}
