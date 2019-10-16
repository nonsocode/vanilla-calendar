(function(){
    let date = new Date(),
        month = date.getMonth(),
        year = date.getFullYear(),
        months = ['January', 'February', 'March', 'April' ,'May' ,'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let firstDay = new Date(year, month, 1),
        lastDay = new Date(year, month + 1, 0),
        infoCardTitle  = document.querySelector('#info-card-title'),
        infoCardBody  = document.querySelector('#info-card-body'),
        addAppointment = document.querySelector('#add-appointment'),
        clearButton = document.querySelector('#clear-appointment'),
        editButton = document.querySelector('#edit-appointment'),

    		calendar = document.querySelector('#calendar'),
     		dates = [];

    setTitle();

    for(let i = firstDay.getDate(); i <= lastDay.getDate(); i++){
      dates.push(createButton(i));
    }

    calendar.append(createSpacer(firstDay));
		dates.forEach(date => calendar.append(date));
		
    addAppointment.onclick = function(event){
			if(this.dataset.hasAppointment === "true"){
				alert('There is already an appointment for this date')
			} else{
				let appointment = obtainAppointment();
				if(appointment){
					addNewAppointment(document.querySelector(`#${this.dataset.for}`), appointment)
				}
			}
		};

		clearButton.onclick = function (event){
			if(confirm('Are you sure you want to delete this appointment?')){
				clearAppointment(document.querySelector(`#${this.dataset.for}`))
			}
		}

		editButton.onclick = function (event){
			let button = document.querySelector(`#${this.dataset.for}`);
			let appointment = obtainAppointment(button.dataset.appointment);
			if(appointment){
				addNewAppointment(button, appointment)
			}
		}
		
		function obtainAppointment(appointment){
			return prompt('What is the appointment?', appointment)
		}

    function createSpacer(date){
      const spacer = document.createElement('div');
      spacer.classList.add('spacer');
      if(date.getDay()){
        spacer.style.gridColumn = '1 / ' + (date.getDay() + 1);
      } else spacer.style.display = 'none';
      return spacer 
    }

    function activateDate (event) {
      let button = event.target;
      dates.forEach(button => button.classList.remove('btn-primary'))
      button.classList.add('btn-primary');
      initialize(button);
    }

		function initialize(button){
			setupActivateButton(button);
			setupClearButton(button);
			setupEditButton(button);
      initializeInfo(button);
		}

    function initializeInfo(button){
      infoCardBody.innerText = button.dataset.appointment || 'No Appointment Yet';
      infoCardTitle.innerText = button.dataset.date && new Date(button.dataset.date).toDateString()
    }

    function createButton(date){
      let button = document.createElement('button'), d = new Date(year, month, date)
      button.className = 'btn date';
      button.innerText = date
      button.id = `date-${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
      button.dataset.date = d.toDateString();
      button.onclick = activateDate;
      return button
    }

    function setTitle(){
      document.querySelector('#title').innerText = months[date.getMonth()]
    }

    function setupActivateButton(dateButton){
      addAppointment.disabled = false;
			addAppointment.dataset.for = dateButton.id
			addAppointment.dataset.hasAppointment = hasAppointment(dateButton)
    }
    function setupClearButton(dateButton){
      clearButton.style.display = hasAppointment(dateButton) ? 'inline-block': 'none';
			clearButton.dataset.for = dateButton.id
    }
    function setupEditButton(dateButton){
      editButton.style.display = hasAppointment(dateButton) ? 'inline-block': 'none';
			editButton.dataset.for = dateButton.id
    }

		function hasAppointment(button){
			return Boolean(button.dataset.appointment);
		}
    function addNewAppointment(dateButton, message){
      dateButton.dataset.appointment = message;
      dateButton.classList.add('has-appointment');
      initialize(dateButton);
		}
		function clearAppointment(dateButton){
      dateButton.dataset.appointment = '';
      dateButton.classList.remove('has-appointment');
      initialize(dateButton);
		}
})()
