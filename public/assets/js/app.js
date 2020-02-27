const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const message_1 = document.querySelector('#message-1')
    const message_2 = document.querySelector('#message-2')
    message_1.textContent = 'Loading...'
    message_2.textContent = ''
    fetch('http://localhost:3000/weather?address=' +
        location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log(data.forecast)
                message_1.textContent = data.location
                message_2.textContent = data.forecast
            }
        })
    })
})