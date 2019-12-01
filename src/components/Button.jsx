import React from 'react';
import './Button.css';

//Check used to change color of operator buttons.
const isOperator = val => {
    return !isNaN(val) || val === "." || val === "=";
}

export const Button = props => (
    <div className={`button-wrapper ${
        isOperator(props.children) ? null : "operator"
        }`}
        onClick={() => props.handleClick(props.children)}
    >
        {props.children}
    </div>
);
