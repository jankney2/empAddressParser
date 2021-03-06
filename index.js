const path=require('path')
require('dotenv').config()
const csv=require('csvtojson')
const fs=require('fs')
const jsCsv=require('json2csv')
const {MAPS_KEY}=process.env
const axios=require('axios')
const massive=require('massive')

let file=path.resolve(__dirname, './data/addresses.csv')

csv().fromFile(file).then(async (arr)=>{

    for(let i=0;i<arr.length;i++){

        if(arr[i]['Home Address 1'].includes('#')){
            arr[i]['Home Address 1'].replace(/#/g, ' ')
        }
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${arr[i]['Home Address 1'].replace(' ', '+')}+${arr[i]['Home City'].replace(' ', '+')}+${arr[i]['Home State'].replace(' ', ',')}+${arr[i]['Home Zip']}&key=${MAPS_KEY}`).then(res=>{
            console.log(res.data.results[0].geometry.location.lat.toString())
            console.log(res.data.results[0].geometry.location.lng.toString())
            arr[i].latitude=res.data.results[0].geometry.location.lat.toString()
            arr[i].longitude=res.data.results[0].geometry.location.lng.toString()



        }).catch(err=>{
            console.log(err, 'error with geocoder', arr[i], i)
        })
    }


    const fields=['Employee Id', 'Last Name', "First Name", 'Home Address 1', "Home Address 2", "Home City", "Home State", "Home Zip", "Home Phone", "latitude", 'longitude']
    const opts={fields}
    try {
        let newData=jsCsv.parse(arr, opts)
        fs.writeFile('./data/geocodedAddresses.csv', newData, 'utf-8', ()=>{
            console.log('success')
        })
    } catch (error) {
        console.log(error, 'error with writing file')
    }
})




