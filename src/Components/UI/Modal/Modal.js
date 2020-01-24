import React from 'react';
import classes from './Modal.module.css';
import ReactAux from '../../../hoc/ReactAux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => (
    <ReactAux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </ReactAux>
);

export default Modal ;