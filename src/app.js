const express= require('express')
const path=require('path')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')
const app=express()

const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup the static diractory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather Web',
        name:'Manish kuri'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Manish kuri'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'I am Looking for your problem.see my work below....',
        title:'HELP',
        name:'Manish kuri'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
      return  res.send({
            error:'please provide a address'
        })
    }
    const address=req.query.address
    geocode(address,(error,{latitude,longitude,location}={})=>{

        if(error)
            return res.send({error})
    
        forecast(latitude,longitude,(error,forcastD)=>{
            if(error)
            return res.send({error})
            res.send({
                location:location,
                forcast:forcastD
            })
        })
    
    })
   
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    res.send({
        products:[]
    })
   
})

app.get('/help/*',(req,res)=>{
    res.send('Help artical not found')
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Manish kuri',
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})