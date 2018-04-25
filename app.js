window.addEventListener('load', ()=> {
    let time = new Date(Date.now())
    const baseURL = 'http://localhost:3077/'
    const messageFocus = document.getElementById('messageFocus')
    const messageForm = document.getElementById('messageForm')
    const buttonArea = document.getElementById('buttonArea')
    const newMessage = document.getElementById('newMessage')

    const timer = () => {
        time = new Date(Date.now())
        const year = document.getElementById('year')
        year.value = `${time.getFullYear()}`
        const month = document.getElementById('month')
        month.value = `${time.getMonth()+1}`
        const day = document.getElementById('day')
        day.value = `${time.getDate()}`
        const hour = document.getElementById('hour')
        hour.value = `${time.getHours()}`
        const minutes = document.getElementById('minutes')
        minutes.value = `${time.getMinutes()}`
        buttonArea.innerHTML = `
        <button id='submit'>submit</button>
        <button>cancel</button>`;
        }

    const makeMessageForm = () => {
        messageForm.innerHTML = `
        <h4>Please select a date</h4>
        <input id="year" type="text">
        <input id="month" type="text">
        <input id="day" type="text">
        <h4>Please select a time</h4>
        <input id="hour" type="text">
        <input id="minutes" type="text">
        <h4>Address/Telephone Number<h4>
        <input id='address'>
        <h4>Carrier(if applicable)<h4>
        <input id='carrier'>
        <h4>Subject<h4>
        <input id='subject'>
        <br>
        <h4>Message<h4>
        <textarea id='field'></textarea>
        `;
        timer()
    }

    //MAKE NEW MESSAGE
    newMessage.addEventListener('click', () => {
        makeMessageForm()
        

    })

    const getMessageFocus = (id) => {
        axios.get(`${baseURL}${id}`)
        .then( response => {
            messageFocus.innerHTML = '';
            messageForm.innerHTML = '';
            buttonArea.innerHTML = '';
            const item = response.data[0];
            const messageFocusSubject = document.createElement('h3')
            messageFocusSubject.innerHTML = item.subject;
            const messageFocusAddress = document.createElement('h4')
            messageFocusAddress.innerHTML = `To ${item.address}`;
            const messageFocusTime = document.createElement('h4')
            const messageFocusTimer = item.time;
            const realTime = new Date(Date.parse(messageFocusTimer));
            messageFocusTime.innerHTML = `Delivery set for: ${realTime}`;
            const messageFocusMessage = document.createElement('p')
            messageFocusMessage.innerHTML = item.message;
            messageFocus.innerHTML = '';
            messageFocus.appendChild(messageFocusSubject);
            messageFocus.appendChild(messageFocusTime);
            messageFocus.appendChild(messageFocusAddress)
            messageFocus.appendChild(messageFocusMessage);
            buttonArea.innerHTML += `
            <button id='editButton'>Edit</button>
            <button id='deleteButton'>Delete</button>`;
            const editButton = document.getElementById('editButton')
            const deleteButton = document.getElementById('deleteButton')
            editButton.addEventListener('click', ()=> {
                messageFocus.innerHTML = '';
                makeMessageForm()
                const messageFormAddress = document.getElementById('address')
                const messageFormCarrier = document.getElementById('carrier')
                const messageFormSubject = document.getElementById('subject')
                const messageFormMessage = document.getElementById('field')
                messageFormAddress.value = `${item.address}`
                messageFormCarrier.value = `${item.carrier}`
                messageFormSubject.value = `${item.subject}`
                messageFormMessage.value = `${item.message}`
                timer()
            })
            deleteButton.addEventListener('click', ()=> {
                console.log('delete clicked')
            })
        })
        .catch( error => console.error(error))
    }


    //GET MESSAGE LIST
    const getMessageList = ()=> {
        axios.get(baseURL)
        .then( response => {
            const messageList = document.getElementById('messageList');
            messageList.innerHTML = '';
            response.data.forEach( item => {
                let messagesItem = document.createElement('li')
                messagesItem.innerHTML = item.subject;
                messageList.appendChild(messagesItem);
                messagesItem.addEventListener('click', ()=> {
                    getMessageFocus(item.id)
                })
            })
        })
        .catch(error => console.error(error))
    }
    getMessageList()

//DOESNT MATTER
    const experiment = ()=> {
        axios.get(baseURL)
        .then(response =>{
            const timeLord = response.data
            const timeDeputy = Date.parse(timeLord[0].time)
            console.log(timeLord[0].time)
            console.log(timeDeputy)
            console.log(new Date(timeDeputy))
        })
    }
    experiment()
    const submitMessage = ()=> {
        const submitButton = document.getElementById('submit')
        submitButton.addEventListener('click', ()=> {
            const inputTitle = document.getElementById('title')
            const inputField = document.getElementById('field')
            

        })
    }
})