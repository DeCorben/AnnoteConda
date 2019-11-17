const drive = require('./neoDrive')
const async = require('async')

describe('feature 2:relationship CRUD',()=>{
    test('read/get realationship',(done)=>{
        let goal = 'TAGS'
        let arg = {source:'Name',
            target:'Glot'
        }
        let verify = (err,res)=>{
            expect(res).toStrictEqual(goal)
            done()
        }
        drive.get(arg,verify)
    })

    test('create/delete relationship',(done)=>{
        let arg = {
            source: 'Poop',
            rel: 'TAGS',
            target: 'Name'
        }
        async.waterfall([
            (next)=>{
                drive.createRel(arg,(err,res)=>{
                    drive.get(arg,(err,res)=>{
                        expect(res).toStrictEqual('TAGS')
                        next(null)  
                    })
                })
            },
            (next)=>{
                drive.deleteRel(arg,(err,res)=>{
                    drive.get(arg,(err,res)=>{
                        expect(res).toBe(undefined)
                        next(null)
                    })
                })
            },
            (next)=>{
                drive.deleteNac({source:arg.source},(err,res)=>{
                    next(null)
                })
            }],
            (err)=>{
                done()
            }
        )
    }) 
})

describe('feature 1: Nac CRUD',()=>{
    test('create/delete nac',(done)=>{
        let check = {name: 'Poop!'}
        let input = {
            source: 'Poop!'
        }
        //verify creation
        let verify = (err,res)=>{
            expect(res).toStrictEqual(check)
        }
        //read nac
        let read = (err,res)=>{
            drive.get(input,verify)
        }
        async.waterfall([
        (next)=>{    
            //create nac
            drive.createNac(input,(err,res)=>{
                drive.get(input,(err,res)=>{
                    expect(res).toStrictEqual(check)
                    next(null)
                })
            })
        },
        (next)=>{
            //delete created nac
            check = undefined
            drive.deleteNac(input,(err,res)=>{
                drive.get(input,(err,res)=>{
                    expect(res).toStrictEqual(check)
                    next(null)
                })
            })
        }
        ],(err)=>{

            done()
        })
    })

    test('read/get nac',(done)=>{
        let glot = {name: 'Glot'}
        //verify existing nac 
        let callback = (err,nac)=>{
            expect(nac).toStrictEqual(glot)
            done()
        }
        drive.get({source:'Glot'},callback)
    })
})

afterAll(()=>{
    drive.stop(()=>{})
})
