const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const port = process.env.PORT || 3000   //process.env.PORT: Heroku port value

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const message_1 = document.querySelector('#message-1')
    const message_2 = document.querySelector('#message-2')
    message_1.textContent = 'Loading...'
    message_2.textContent = ''
    fetch('http://localhost:' + port + '/weather?address=' +
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