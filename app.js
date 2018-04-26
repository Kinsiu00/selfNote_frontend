window.addEventListener('load', ()=> {
    let time;
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
        <button id='cancel'>cancel</button>`;
        }

    const makeMessageForm = () => {
        messageFocus.innerHTML = ''
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
        const submitButtonNew = document.getElementById('submit')
        submitButtonNew.addEventListener('click', () => {
            const newAddress = document.getElementById('address').value
            const newCarrier = document.getElementById('carrier').value || 'N/A'
            const newSubject = document.getElementById('subject').value || 'No Subject'
            const newMessage = document.getElementById('field').value

            const newYear = document.getElementById('year').value
            const newMonth = document.getElementById('month').value
            const newDay = document.getElementById('day').value
            const newHour = document.getElementById('hour').value
            const newMinutes = document.getElementById('minutes').value

            const newDate = new Date(newYear, newMonth-1, newDay,newHour,newMinutes).toISOString()
            const newDateNum = Date.parse(newDate)
            console.log(newDate)
            console.log(newDateNum)
            axios.post(baseURL, {address: newAddress, carrier: newCarrier, subject: newSubject, message: newMessage, time: newDate, timeNum: newDateNum})
            .then(result => {
                console.log('success')
                getMessageList();
                getMessageFocus(result.data.id)
            })
            .catch(error => console.error(error))

        })
        const cancelButtonNew = document.getElementById('cancel')
        cancelButtonNew.addEventListener('click', () => {
            messageForm.innerHTML = '';
            buttonArea.innerHTML = '';
            getMessageList();
        })
        

    })

    const deleteMessage = (id) => {
        axios.delete(`${baseURL}${id}`)
        .then( response => {
            messageFocus.innerHTML = '';
            getMessageList()
        })
    }
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
            const realTime = new Date(messageFocusTimer);
            messageFocusTime.innerHTML = `Delivery set for: ${realTime.toLocaleDateString()} at ${realTime.toLocaleTimeString()}`;
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
                messageFormAddress = document.getElementById('address')
                messageFormAddress.value = item.address
                messageFormCarrier = document.getElementById('carrier')
                messageFormCarrier.value = item.carrier
                messageFormSubject = document.getElementById('subject')
                messageFormSubject.value = item.subject
                messageFormMessage = document.getElementById('field')
                messageFormMessage.value = item.message

                const editSubmit = document.getElementById('submit')
                editSubmit.addEventListener('click', ()=> {
                    const editYear = document.getElementById('year').value
                    const editMonth = document.getElementById('month').value
                    const editDay = document.getElementById('day').value
                    const editHour = document.getElementById('hour').value
                    const editMinutes = document.getElementById('minutes').value
                    const editDate = new Date(editYear, editMonth-1, editDay,editHour,editMinutes).toISOString()
                    const editDateNum = Date.parse(editDate)
                    console.log(editDate)
                    console.log(editDateNum)
                    axios.put(`${baseURL}${id}`,{address: messageFormAddress.value, carrier: messageFormCarrier.value, subject: messageFormSubject.value, message: messageFormMessage.value, time: editDate, timeNum: editDateNum})
                    .then(result => {
                        getMessageList();
                        getMessageFocus(result.data.id);
                    })
                    .catch(error => console.error(error))
                })
                const editCancel = document.getElementById('cancel')
                editCancel.addEventListener('click', ()=> {
                    messageForm.innerHTML = '';
                    buttonArea.innerHTML = '';
                    getMessageList();
                })
            })
            deleteButton.addEventListener('click', ()=> {
                deleteMessage(id)
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
})