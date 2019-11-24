import React from 'react'
const axios = require('axios')

export default class AnnotePage extends React.Component{
    render(){
        return (
            <div>
                <div>
                    <label>Source: </label>
                    <input type="text" name="source" id="source"
                        />
                </div>
                <div>
                    <label>Relationship: </label>
                    <input type="text" name="rel"
                        />
                </div>
                <div>
                    <label>Target: </label>
                    <input type="text" name="target"
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
