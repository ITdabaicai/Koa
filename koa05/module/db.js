
const MongoClient = require('mongodb').MongoClient;

const config =require('./config')

class Db{
    static getInstance(){
        if(!Db.instance){
            Db.instance=new Db();
        }
        return Db.instance;
    }
    constructor(){
        this.dbClient='';
        this.connect();
    }
    connect(){
       return new Promise((resolve,reject)=>{
           if(this.dbClient) return resolve(this.dbClient);
           MongoClient.connect(config.dbUrl,(err,client)=>{
               if(err){

               }else{
                  this.dbClient=client.db(config.dbName)
                  resolve(this.dbClient)
               }
           })
       })
    }
    find(collectionName,json){
       return new Promise((resolve,reject)=>{
           this.connect().then((db)=>{
               var result =   db.collection(collectionName).find(json)
               result.toArray((err,docs)=>{
                   if(err){
                       reject(err)
                       return;
                   }
                   resolve(docs)
               })
           })
       })
    }
    update(collectionName,json1,json2){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                    db.collection(collectionName).updateOne(json1,{
                        $set:json2
                    },(err,res)=>{
                        if(err){
                            reject(err)
                        }else{
                            resolve(res)
                        }
                    })

            })
        })
    }
    insert(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).insertOne(json,(err,res)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(res)
                    }
                })
            })
        })
    }
    remove(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).remove(json,(err,res)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(res)
                    }
                })
            })
        })
    }
}

module.exports = Db.getInstance();


