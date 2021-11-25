import express from 'express'
import cors from 'cors'
const app = express();

import {cities} from './cities.js'


app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000


app.post('/search', (req,res)=>{
    

    let city = JSON.parse(req.body.city)

    let name = city.city_name
    let code = city.state_code

    for(let i=0; i < cities.length ; i++){
        if(name == cities[i].city_name && code == cities[i].state_code){
          res.send(cities[i])
          
        }
    }
})

app.post('/searching', (req,res)=>{
    
    function parameter (value){
        let city = value.city_name.toLowerCase()
        let key = req.body.query.toLowerCase()

        return city.includes(key);
    }

    let copy = [...cities]
    let filtered = copy.filter(parameter)
    if(filtered.length > req.body.count){
        filtered = filtered.slice(0, req.body.count);
    }

    res.send(filtered);

})

app.listen(port, ()=>{
    console.log(`Listening on port ${5600}`)
})
