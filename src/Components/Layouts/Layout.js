import React from 'react' ;
import ReactAux from '../../hoc/ReactAux' ;
import classes from './Layout.module.css' ;
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = ( props ) => (
    <ReactAux>
    <Toolbar />
    <main className={classes.Content}>
        {props.children}
    </main>
    </ReactAux>
);

export default layout;