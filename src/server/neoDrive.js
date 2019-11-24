const neo4j = require('neo4j-driver').v1
var driver = neo4j.driver('bolt://localhost:7687',
    neo4j.auth.basic('neo4j','grinbear'))

module.exports = {
    start: (cb)=>{
        driver = neo4j.driver('bolt://localhost:7687',
            neo4j.auth.basic('neo4j','grinbear'))
        cb(null)
    },

    stop: (cb)=>{
        driver.close()
        cb(null)
    },

    createNac: (s,cb)=>{
        let sesh = driver.session()
        if(sesh == null){
            cb('Session error')
        }
        let cypher = 'MERGE (n:Nac {name:$source})'
        sesh.run(cypher,s)
            .subscribe({
                onNext:(res)=>{},
                onCompleted:(_summary)=>{
                    sesh.close()
                    cb(null,'Fufilled')
                },
                onError:(err)=>{
                    sesh.close()
                    cb(`Error ${err.code}: ${err.message}`,null)
                }
            })
    },
    createRel: (arg,cb)=>{
        let cypher = `MATCH (t {name:$target}) MERGE (s:Nac {name:$source}) MERGE (s)-[r:${arg.rel}]->(t) RETURN s,r,t`
        let reply 
        let sesh = driver.session()
        sesh.run(cypher,arg)
            .subscribe({
                onNext: (rec)=>{
                    reply = rec.toObject().r.type
                },
                onCompleted: (sum)=>{
                    sesh.close()
                    cb(null,reply)
                },
                orError: (err)=>{
                    sesh.close()
                    cb(`Error ${err.code}: ${err.message}`,null)
                }
            })
    },
    deleteNac: (input,cb)=>{
        let cypher = 'MATCH (z:Nac {name:$source}) WHERE NOT (z)-[]-() DELETE z'
        let sesh = driver.session()
        sesh.run(cypher,input)
            .subscribe({
                onCompleted:(_summary)=>{
                    sesh.close()
                    cb(null,'Deleted')
                },
                onError:(err)=>{
                    sesh.close()
                    cb(`Error ${err.code}: ${err.message}`,null)
                }
            })
    },
    deleteRel: (arg,cb)=>{
        let cypher = `MATCH (s {name:$source})-[r:${arg.rel}]->(t {name:$target}) DELETE r`
        let sesh = driver.session()
        sesh.run(cypher,arg)
            .subscribe({
                onCompleted: (_sum)=>{
                    sesh.close()
                    cb(null,`${arg.rel} deleted`)
                },
                onError: (err)=>{
                    sesh.close()
                    cb(`Error ${err.code}: ${err.message}`,null)
                }
            })
    },
    get: (input,cb)=>{
        let cypher
        let prop
        if(input.source && input.target){
            cypher = 'MATCH (s {name:$source})-[z]->(t {name:$target}) RETURN z'
            prop = 'type'
        }else if(input.source){
            cypher = 'MATCH (z {name:$source}) RETURN (z)'
            prop = 'properties'
        }
        let sesh = driver.session()
        let reply
        sesh.run(cypher,input)
            .subscribe({
                onNext: (rec)=>{
                    reply = rec.toObject().z[prop]
                },
                onCompleted: (sum)=>{
                    cb(null,reply)
                },
                onError: (err)=>{
                    cb(err)
                }
            })
    }
}
