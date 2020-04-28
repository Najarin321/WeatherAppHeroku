console.log('Im a client-side file in a js directory')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageTwo.textContent = 'Loading...'

    const location = encodeURIComponent(search.value)

    fetch(`/weather?address=${location}`).then((response) => response.json().then(data => {
    if(data.error){
        messageTwo.textContent = data.error
    }    
    else{
        messageTwo.textContent = `Em ${data.address} fazem ${data.forecast} graus`
    }}))
})