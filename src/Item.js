import React from 'react';

class Item extends React.Component {

    componentDidMount() {
        console.log("Item");
    }

    handlerClick = () => {
        this.props.onClickItem(this.props.element);
    }

    render() {
        //  console.log(this.props.element)

        return <div>
            {this.props.element.expanded ?
                <li><span onClick={this.handlerClick}>{this.props.element.name}</span></li> : null
            }

        </div>
    }
}

export default Item;