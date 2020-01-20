import React, {Component} from 'react' ;
import ReactAux from '../../hoc/ReactAux' ;
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }

    }

    render () {
        return (
            <ReactAux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls />
            </ReactAux>
        );
    }
}

export default BurgerBuilder ;