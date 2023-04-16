import React from 'react';
import classes from './Button.module.scss';

const Button = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>            
    );
}

export default Button;
