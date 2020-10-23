import React, { useState } from 'react' ;
import ReactAux from '../../hoc/ReactAux' ;
import classes from './Layout.module.css' ;
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


const Layout = props => {
    const [sideDrawerisVisible, setSidedrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSidedrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSidedrawerIsVisible(!sideDrawerisVisible);
    }

        return (
            <ReactAux>
                <Toolbar drawerToggleClicked={sideDrawerToggleHandler}
                         isAuth={props.isAuthenticated}/>
                <SideDrawer
                    closed={sideDrawerClosedHandler}
                    open={sideDrawerisVisible}
                    isAuth={props.isAuthenticated}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </ReactAux>
        )
    }


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);