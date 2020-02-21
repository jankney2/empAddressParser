const express=require('express')
const app=express()
const path=require('path')
require('dotenv').config()
const papa=require('papaparse')
const csv=require('csvtojson')
const {MAPS_KEY}=process.env

app.listen(7000, ()=>{
    console.log('listening on 7000')
})  


let file=path.resolve(__dirname, './data/addresses.csv')

csv().fromFile(file).then((obj)=>{
    console.log(obj)

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=512+N+Claypool+ct+virginia+beach+virginia&key=${MAPS_KEY}`)
    

})

//get csv file 
//parse csv into json 

//parse json into regular array 

//for each item, get geocode

//add in geocode to item 

//reverse parse into csv

//save in data folder. 

//yay! 


