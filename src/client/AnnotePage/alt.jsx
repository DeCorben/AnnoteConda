import React from 'react'
const axios = require('axios')

export default class AnnotePage extends React.Component{
    render(){
        return (
            <div>
                <div>
                    <label for="source">Source: </label>
                    <input type="text" id="source"
                        />
                    <label for="rel">Relationship: </label>
                    <input type="text" id="rel"
                        />
                    <label for="target">Target: </label>
                    <input type="text" id="target"
                        />
                </div>
                <div>
                    <button>Create</button>
                    <button>Delete</button>
                </div>
                <div className="result">
                </div>
            </div>)
    }
}
