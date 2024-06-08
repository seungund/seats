document.addEventListener('DOMContentLoaded', () => {
    const seatingChart = document.querySelector('.seating-chart');
    const selectedSeatsList = document.getElementById('selected-seats-list');
    const reserveBtn = document.getElementById('reserve-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const nameInput = document.getElementById('name-input');
    const timeSelect = document.getElementById('time-select');
    const reservationHistoryList = document.getElementById('reservation-history-list');
    const reservations = [];

    // Populate time select options
    const startHour = 6; // 8 AM
    const endHour = 21; // 10 PM
    for (let hour = startHour; hour <= endHour; hour += 1) {
        const option = document.createElement('option');
        option.value = `${hour}:00`;
        option.textContent = `${hour}:00 - ${hour + 1}:00`;
        timeSelect.appendChild(option);
    }

    // Create seats
    for (let i = 0; i < 50; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.dataset.seatNumber = i + 1;
        seat.textContent = i + 1;
        seat.addEventListener('click', () => {
            seat.classList.toggle('selected');
            updateSelectedSeats();
        });
        seatingChart.appendChild(seat);
    }

    // Update the list of selected seats
    function updateSelectedSeats() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        selectedSeatsList.innerHTML = '';
        selectedSeats.forEach(seat => {
            const seatNumber = seat.dataset.seatNumber;
            const listItem = document.createElement('li');
            listItem.textContent = `Seat ${seatNumber}`;
            selectedSeatsList.appendChild(listItem);
        });
    }

    // Reserve selected seats
    reserveBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const time = timeSelect.value;
        if (name === '' || time === '') {
            alert('Please enter your name and select a time to reserve seats.');
            return;
        }

        const selectedSeats = document.querySelectorAll('.seat.selected');
        selectedSeats.forEach(seat => {
            const seatNumber = seat.dataset.seatNumber;

            if (isSeatReserved(seatNumber, time)) {
                alert(`Seat ${seatNumber} is already reserved for the selected time.`);
                return;
            }

            seat.classList.remove('selected');
            seat.classList.add('reserved');
            reservations.push({
                seatNumber,
                name,
                time
            });
            seat.innerHTML = `<span>${seatNumber}</span>`;
            addReservationHistory(seatNumber, name, time);
        });
        updateSelectedSeats();
    });

    // Check if a seat is already reserved for the given time
    function isSeatReserved(seatNumber, time) {
        return reservations.some(reservation => reservation.seatNumber == seatNumber && reservation.time === time);
    }

    // Add to reservation history
    function addReservationHistory(seatNumber, name, time) {
        const listItem = document.createElement('li');
        listItem.textContent = `Seat ${seatNumber} reserved by ${name} for ${time}`;
        reservationHistoryList.appendChild(listItem);
    }

    // Cancel reservations
    cancelBtn.addEventListener('click', () => {
        const reservedSeats = document.querySelectorAll('.seat.reserved');
        reservedSeats.forEach(seat => {
            seat.classList.remove('reserved');
            seat.innerHTML = seat.dataset.seatNumber;
        });
        reservationHistoryList.innerHTML = '';
        reservations.length = 0;
    });
});
