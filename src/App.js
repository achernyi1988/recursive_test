import React from 'react';
import node from "./Node"
import Item from "./Item"

const continents = require("./continents_test")


function recursiveIteration(object, node) {

    for (var property in object) {
        //not necessary hasOwnProperty method since this json contains properties
        if (object.hasOwnProperty(property)) {
            if (typeof object[property] === "object") {

                if (!(Array.isArray(node.list) && node.list.length > 0)) {
                    recursiveIteration(object[property], node);
                } else {
                    recursiveIteration(object[property], object.length > 1 ? node : node.list[node.list.length - 1]);
                }
            } else {
                //found a property which is not an object, check for your conditions here

                if (property === "name" && object[property]) {
                     console.log("property === \"name\" ", object[property]);
                    node.list.push({name: object[property], expanded: false, list: []})
                }
            }
        }
    }

}


function assignRoot(nodes, root){

    console.log("assignRoot",nodes , root )

    if (nodes == null ) {
        return null;
    }

    nodes.map((elem) => {
        elem.root = root;

        return assignRoot( elem.list, root);
    })

}
class App extends React.Component {

    state={data:null}

    constructor(props){
        super(props)


        recursiveIteration(continents, node);

        node.list.map((elem) => {
            assignRoot(elem.list, elem);
            return elem.expanded = true;

        });

        this.state = {data: node}
    }

    expand = (elem) => {
        elem.expanded = true;
    }

    collapse = (item) => {
        if (item == null || item.list == null ) {
            return;
        }

        item.expanded = false;
        item.list.map((elem) => {

            return this.collapse(elem);
        })
    }


    handlerClick = (item) => {
        console.log("App::handlerClick item",item);

        if( item.list.length === 0){
            console.log("child");
            //collapse all except for root
            item.root.list.map((elem) => {
                this.collapse(elem);
            })

        }else{
            item.list.map((elem) => {

                if (elem.expanded) {
                    this.collapse(elem);
                } else {
                    this.expand(elem);
                }
            })
        }


        this.setState(this.state);
    }
    updateItems = (node) => {

        if (node == null || node.list == null || node.list.length === 0) {
            return null;
        }
        let data = [];
           node.list.map((elem  ) => {
            data.push(  <div  key={data.length} ><Item  element={elem} onClickItem={this.handlerClick}/> </div> );
            return data.push( <ul key={data.length} >{this.updateItems(elem)}</ul> );

        })
        return data;
    }

    showNode = () => {

        if (this.state.data == null) {
            return null
        }

        let jsx = this.updateItems(this.state.data);

        return jsx.map((elem, i) => {
            return <div key={i}>{elem}</div>;
        });
    }

    render() {
        console.log("render", this.state.data);
        return (
            <div className="App">
                {this.showNode()}
            </div>
        )
    }
}

export default App;
