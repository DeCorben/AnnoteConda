import React from 'react'
const axios = require('axios')

export default class AnnotePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            result:'',
            source:'',
            rel:'',
            target: ''
        }
        this.create = this.create.bind(this)
        this.updateSource = this.updateSource.bind(this)
        this.remove = this.remove.bind(this)
        this.callApi = this.callApi.bind(this)
    }

    callApi(func){
        let {source,rel,target} = this.state
        let endpoint = `/neo/${func}`
        if(source && rel && target){
            endpoint += '/rel'
        }else if(source){
            endpoint += '/nac'
        }
        axios.post(endpoint,{source:source,rel:rel,target:target})
            .then((res)=>{
                this.setState({result:res.data})
            })
            .catch((err)=>{
                console.log('Http error')
                console.log('Err: '+err)
                this.setState({result:JSON.stringify(err,null,'\t')})
            })
    }

    updateSource(change){
        let prop = change.target.name
        this.setState({[prop]:change.target.value})
    }

    create(){this.callApi('create')}

    remove(){this.callApi('delete')}

    render(){
        return (
            <div>
                <div>
                    <label>Source: </label>
                    <input type="text" name="source" id="source"
                        value={this.state.source}
                        onChange={this.updateSource}
                        />
                </div>
                <div>
                    <label>Relationship: </label>
                    <input type="text" name="rel"
                        value={this.state.rel}
                        onChange={this.updateSource}
                        />
                </div>
                <div>
                    <label>Target: </label>
                    <input type="text" name="target"
                        value={this.state.target}
                        onChange={this.updateSource}
                        />
                </div>
                <div>
                    <button onClick={this.create}>Create</button>
                    <button onClick={this.remove}>Delete</button>
                </div>
                <div className="result">
                    {this.state.result}
                </div>
            </div>)
    }
}
