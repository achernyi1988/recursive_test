import React from 'react';
let company = require("./company")


function deepReduce(collection, fn, memo) {

    /**
     * @inner
     * @param  {*} value
     * @param  {String[]} path
     * @return {*}
     */
    function iterator(value, path) {
        var type = Object.prototype.toString.call(value);
        memo = fn(memo, value, path);
        if (type === '[object Array]') {
            for (var i = 0, len = value.length; i < len; i++) {
                iterator(value[i], path.concat(i));
            }
        } else if (type === '[object Object]') {
            for (var key in value) {
                iterator(value[key], path.concat(key));
            }
        }
        return memo;
    }

    return iterator(collection, []);

}


function traverse(o, fn,underscore) {

    for (var i in o) {

        if(fn (i,o[i], underscore))
        {

            underscore +="_"
            console.log("enter ", underscore, o[i]);
        }


        if (o[i] !== null && typeof(o[i])==="object"     ) {

            traverse(o[i], fn,underscore);

        }
        console.log("exit ", underscore, o[i]);
    }
}

class App extends React.Component{

  componentDidMount(){
    //console.log("company = ",  company)

      // deepReduce(company, function(memo, value, path) {
      //     memo[path.join('.')] = value;
      //     console.log("value",value);
      //     return memo;
      // }, {});
        let underscore =""
      traverse(company, function(k,v, sign){
          // console.log(k + " : " + v);

          if(!isNaN( parseInt(k))){
      dd
          }

          if(typeof(v)!=="object"){
              console.log( sign + v);
              return false;

          }else
          {
              console.log( sign + k);
          }

            return true;

      },underscore);
  }

  render() {
      return (
          <div className="App">
              Hi
          </div>
      );
  }
}

export default App;
