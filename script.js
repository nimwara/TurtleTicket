document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".form-step");
    const progressBarSteps = document.querySelectorAll(".progress-bar-step");
    let currentStep = 0;
  
    function showStep(stepIndex) {
      steps.forEach((step, index) => {
        step.style.display = index === stepIndex ? "block" : "none";
      });
      updateProgressBar(stepIndex);
    }
  
    function updateProgressBar(stepIndex) {
      progressBarSteps.forEach((step, index) => {
        if (index <= stepIndex) {
          step.style.backgroundColor = "#5cb85c"; // Completed step
        } else {
          step.style.backgroundColor = "#6593b5"; // Pending step
        }
      });
    }
  
    function nextStep() {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    }
  
    function prevStep() {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    }
  
    function submitForm() {
      // Perform form submission here
      alert("Submitted successfully!");
    }
  
    document.querySelector(".next-button").addEventListener("click", nextStep);
    document.querySelector(".prev-button").addEventListener("click", prevStep);
    document.querySelector(".submit-button").addEventListener("click", submitForm);
  
    showStep(currentStep);
  });
 
  document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const reservationSummary = document.getElementById('reservationSummary');
  
    // Function to load reservation details from local storage
    function loadReservationDetails() {
      const reservationDetails = JSON.parse(localStorage.getItem('reservationDetails'));
      if (reservationDetails) {
        document.getElementById('reservationDate').value = reservationDetails.date;
        document.getElementById('timeSlot').value = reservationDetails.timeSlot;
        document.getElementById('visitorType').value = reservationDetails.visitorType;
        document.getElementById('adultTickets').value = reservationDetails.adultTickets;
        document.getElementById('childTickets').value = reservationDetails.childTickets;
        document.getElementById('infantTickets').value = reservationDetails.infantTickets;
        calculateTotal(); // Calculate total cost and display the reservation summary
      }
    }
  
    // Function to calculate the total cost and display the reservation summary
    function calculateTotal() {
      // Get form input values
      const date = document.getElementById('reservationDate').value;
      const timeSlot = document.getElementById('timeSlot').value;
      const visitorType = document.getElementById('visitorType').value;
      const adultTickets = parseInt(document.getElementById('adultTickets').value);
      const childTickets = parseInt(document.getElementById('childTickets').value);
      const infantTickets = parseInt(document.getElementById('infantTickets').value);
  
      // Calculate total cost (unchanged)
      const localRegularRate = 10;
      const foreignerRegularRate = 15;
      const localSpecialRate = 12;
      const foreignerSpecialRate = 10;
      let totalCost = 0;
  
      if (timeSlot === 'regular') {
        if (visitorType === 'local') {
          totalCost =
            adultTickets * localRegularRate +
            childTickets * localRegularRate +
            infantTickets * 0; 
        } else {
          totalCost =
            adultTickets * foreignerRegularRate +
            childTickets * foreignerRegularRate +
            infantTickets * 0; 
        }
      } else {
        if (visitorType === 'local') {
          totalCost =
            adultTickets * localSpecialRate +
            childTickets * localSpecialRate +
            infantTickets * 0; 
        } else {
          totalCost =
            adultTickets * foreignerSpecialRate +
            childTickets * foreignerSpecialRate +
            infantTickets * 0; 
        }
      }
  
      // Update reservation summary (unchanged)
      document.getElementById('summaryDate').textContent = date;
      document.getElementById('summaryTimeSlot').textContent = timeSlot === 'regular' ? 'Regular Time Slot' : 'Special Time Slot';
      document.getElementById('summaryVisitorType').textContent = visitorType === 'local' ? 'Local' : 'Foreigner';
  
      const summaryTickets = document.getElementById('summaryTickets');
      summaryTickets.innerHTML = '';
  
      if (adultTickets > 0) {
        const adultTicketListItem = document.createElement('li');
        adultTicketListItem.textContent = `Adult (18+): ${adultTickets} ticket(s)`;
        summaryTickets.appendChild(adultTicketListItem);
      }
  
      if (childTickets > 0) {
        const childTicketListItem = document.createElement('li');
        childTicketListItem.textContent = `Child (6-17): ${childTickets} ticket(s)`;
        summaryTickets.appendChild(childTicketListItem);
      }
  
      if (infantTickets > 0) {
        const infantTicketListItem = document.createElement('li');
        infantTicketListItem.textContent = `Infant: ${infantTickets} ticket(s)`; 
        summaryTickets.appendChild(infantTicketListItem);
      }
  
      document.getElementById('summaryTotalCost').textContent = `$${totalCost}`;
  
      // Store the reservation details in local storage
      const reservationDetails = {
        date,
        timeSlot,
        visitorType,
        adultTickets,
        childTickets,
        infantTickets,
        totalCost,
      };
      localStorage.setItem('reservationDetails', JSON.stringify(reservationDetails));
  
      // Show reservation summary
      reservationSummary.style.display = 'block';
    }
  
    // Load stored reservation details on page load
    loadReservationDetails();
  
    calculateBtn.addEventListener('click', calculateTotal);
  });

  
  detailsForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    // Get form input values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
  
    $("#tel").intlTelInput({
      initialCountry: "in",
      separateDialCode: true,
       utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
    });

    // Simple validation
    if (firstName.trim() === '') {
      alert('Please enter your first name.');
      return;
    }
  
    if (lastName.trim() === '') {
      alert('Please enter your last name.');
      return;
    }
  
    if (email.trim() === '') {
      alert('Please enter your email address.');
      return;
    }
  
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    if (phoneNumber.trim() === '') {
      alert('Please enter your phone number.');
      return;
    }
  
    if (!isValidPhoneNumber(phoneNumber)) {
      alert('Please enter a valid phone number.');
      return;
    }
  
    // Save data to local storage
    const personalDetails = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      email: email,
      phoneNumber: phoneNumber,
    };
    localStorage.setItem('personalDetails', JSON.stringify(personalDetails));
  
    // Show confirmation message
    confirmationMessage.classList.remove('hidden');
  
    // Reset the form after 2 seconds
    setTimeout(() => {
      detailsForm.reset();
      confirmationMessage.classList.add('hidden');
    }, 2000);
  });
  
  function isValidEmail(email) {
    // Basic email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function isValidPhoneNumber(phoneNumber) {
    // Basic phone number validation using regular expression
    const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
    return phoneRegex.test(phoneNumber);
  }
  


  document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');
  
    // Load saved data from local storage if available
    const savedPaymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));
    if (savedPaymentDetails) {
      document.getElementById('cardType').value = savedPaymentDetails.cardType;
      document.getElementById('cardNumber').value = savedPaymentDetails.cardNumber;
      document.getElementById('nameOnCard').value = savedPaymentDetails.nameOnCard;
      document.getElementById('startDate').value = savedPaymentDetails.startDate;
      document.getElementById('endDate').value = savedPaymentDetails.endDate;
      document.getElementById('cvv').value = savedPaymentDetails.cvv;
    }
  
    paymentForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Get form input values
      const cardType = document.getElementById('cardType').value;
      const cardNumber = document.getElementById('cardNumber').value;
      const nameOnCard = document.getElementById('nameOnCard').value;
      const startDate = document.getElementById('startDate').value;
      const endDate = document.getElementById('endDate').value;
      const cvv = document.getElementById('cvv').value;
  
      // Simple validation
      if (cardType.trim() === '') {
        alert('Please select a card type.');
        return;
      }
  
      if (cardNumber.trim() === '') {
        alert('Please enter your card number.');
        return;
      }
  
      if (nameOnCard.trim() === '') {
        alert('Please enter the name on the card.');
        return;
      }
  
      if (startDate.trim() === '' || endDate.trim() === '') {
        alert('Please enter card validity dates.');
        return;
      }
  
      if (cvv.trim() === '') {
        alert('Please enter the CVV number.');
        return;
      }
  
      // Save data to local storage
      const paymentDetails = {
        cardType: cardType,
        cardNumber: cardNumber,
        nameOnCard: nameOnCard,
        startDate: startDate,
        endDate: endDate,
        cvv: cvv,
      };
      localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
  
      alert('Payment details saved successfully!');
    });
  });
  
 // const confirmationDate = document.getElementById('confirmationDate');  
document.addEventListener('DOMContentLoaded', () => {
 localStorage.getItem("personalDetails", personalDetails);
 JSON.parse(personalDetails);
 console.log(personalDetails);
 
});
