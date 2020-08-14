
console.log('Client side javascript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=jaipur').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error)
//         return console.log(data.error)
//         else{
//             console.log(data.location),
//             console.log(data.forcast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')


// messageOne.textContent=''
// messageTwo.textContent=''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value
    messageOne.textContent='Loading....'

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        return console.log(data.error)
        else{
            
            messageOne.textContent=data.location,
            messageTwo.textContent=data.forcast
        }
    })
})
    // console.log(location)
})