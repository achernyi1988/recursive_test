import React from 'react';
const continents = require("./continents_test")


function recursiveIteration(object, callback, dash) {
    for (var property in object) {
        //not necessary hasOwnProperty method since this json contains properties
        if (object.hasOwnProperty(property)) {
            if (typeof object[property] == "object"){
                recursiveIteration(object[property], callback, dash );
            }else{
                //found a property which is not an object, check for your conditions here

                if(callback(object, property, dash)){
                    dash+="------"
                }
            }
        }
    }
}

class App extends React.Component {


    componentDidMount(){
        let dash="";
        recursiveIteration(continents, ((object, property, dash)=>{

            if(property === "name" && object[property]) {

                console.log(dash + object[property]);
                return true;
            }

            return false;
        }), dash);
    }

    render(){
        return (
            <div className="App">
                Hi
            </div>
        )
    }
}

export default App;
