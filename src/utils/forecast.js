const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=af1f1994d2c749e77e7a6d6402363c6b&query='+latitude+','+longitude

    request({url,json:true},(error,{body})=>
    {
        // console.log(response.data)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,
            'It is currently '
            +body.current.temperature
            +' degrees. but feels like it is '
            +body.current.feelslike
            +' degress out there.'
            )
        }
    })

}

module.exports=forecast