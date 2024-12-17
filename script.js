// let searchBtn = document.querySelector('#search-btn');
// let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
// let loginForm = document.querySelector('.login-form-container');
// let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');
let videoSlider = document.querySelector('#video-slider');

window.onscroll = () => {
// searchBar.classList.remove('active');
 menu.classList.remove('fa-times');
 navbar.classList.remove('active');
 loginForm.classList.remove('active');
}


menu.addEventListener('click', () => {
 menu.classList.toggle('fa-times');
 navbar.classList.toggle('active');
 });


// searchBtn.addEventListener('click', () => {
//  searchBtn.classList.toggle('fa-times');
//  searchBar.classList.toggle('active');
//  });

//  formBtn.addEventListener('click', () => {
//  loginForm.classList.add('active');
//  });

//  formClose.addEventListener('click', () => {
//  loginForm.classList.remove('active');
//  });

videoBtn.forEach(btn =>{
 btn.addEventListener('click', ()=>{
  document.querySelector('.controls .active').classList.remove('active');
  btn.classList.add('active'); 
  let src = btn.getAttribute('data-src');
  document.querySelector('#video-slider').src= src;
 });
});

// Function to automatically change the video every 10 seconds
let videoIndex = 0;
const videoSources = [
  'Images/vid-1.mp4',
  'Images/vid-2.mp4',
  'Images/vid-3.mp4',
  'Images/vid-4.mp4',
  'Images/vid-5.mp4'
];

// Set interval to change the video every 10 seconds
setInterval(() => {
  // Remove active class from the previous button
  document.querySelector('.controls .active').classList.remove('active');

  // Increment video index (loop back to the start after the last video)
  videoIndex = (videoIndex + 1) % videoSources.length;

  // Set the new video source
  videoSlider.src = videoSources[videoIndex];

  // Add active class to the corresponding button
  videoBtn[videoIndex].classList.add('active');
}, 10000); // 10000 milliseconds = 10 seconds

// Swipe functionality to change the video
let touchStartX = 0;
let touchEndX = 0;

// Detect swipe direction
function handleSwipe() {
  // If the swipe is from right to left (swiping to the next video)
  if (touchEndX - touchStartX > 50) {
    // Swipe right (next video)
    videoIndex = (videoIndex + 1) % videoSources.length;
  }

  // If the swipe is from left to right (swiping back to previous video)
  if (touchStartX - touchEndX > 50) {
    // Swipe left (previous video)
    videoIndex = (videoIndex - 1 + videoSources.length) % videoSources.length;
  }

  // Update the video source and active button
  videoSlider.src = videoSources[videoIndex];
  document.querySelector('.controls .active').classList.remove('active');
  videoBtn[videoIndex].classList.add('active');
}

// Attach touch event listeners for swipe detection
videoSlider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

videoSlider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe(); // Handle swipe direction and change video
});



// var swiper = new Swiper(".brand-slider", {
//  spaceBetween: 20,
//  loop:true,
//  autoplay: {
//   delay: 2500,
//   disableOnInteraction: false,
//  },
//  breakpoints: {
//   450: {
//    slidesPerView: 2,
//   },
//   768: {
//    slidesPerView: 3,
//   },
//   991: {
//    slidesPerView: 4,
//   },
//   1200: {
//    slidesPerView: 5,
//   },
//  },
// });




document.getElementById('bookNowForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.style.display = 'block';
        if (data.success) {
            responseMessage.textContent = 'Thank you for your submission! We will get back to you shortly.';
            responseMessage.style.color = 'green';
            form.reset(); // Optionally clear the form
        } else {
            responseMessage.textContent = 'There was an error. Please try again.';
            responseMessage.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.style.display = 'block';
        responseMessage.textContent = 'An unexpected error occurred. Please try again later.';
        responseMessage.style.color = 'red';
    });
});



//open function
function openBookingForm(packageName) {
  document.getElementById("formModal").style.display = "flex";
  document.getElementById("packageName").value = packageName; // Set the hidden package name input
}

// Submit the form data to Google Sheets
async function submitForm() {
  const name = document.getElementById("name").value;
  const namePattern = /^[A-Za-z\s]+$/; 
  if (!namePattern.test(name)) {
    alert("Name should only contain letters and spaces (no numbers or special characters).");
    event.preventDefault(); 
    return;
  }
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;
  const packageName = document.getElementById("packageName").value;

  // Check if all fields are filled
  if (!name || !contact || !email || !packageName) {
    alert("Please fill all fields");
    return;
  }

  // Show the loading text
  document.getElementById("loadingText").style.display = "block";
  
  try {
    const url = `https://script.google.com/macros/s/AKfycbyDNUjn6nHzQZ4GRIZd6UCPU-IdKr81yYp4uH-8iLyaOwXqi4I34kB2Pux6DTBRPis/exec?name=${encodeURIComponent(name)}&contact=${encodeURIComponent(contact)}&email=${encodeURIComponent(email)}&packageName=${encodeURIComponent(packageName)}`;
    
    const response = await fetch(url, { method: "GET" });

    if (response.ok) {
      const result = await response.json();  

      if (result.status === 'Success') {
        showModal('successModal');
      } else {
        showModal('errorModal');
      }
      // document.getElementById("packageform").reset();
      
    closeForm();
  
    } else {
      console.error("Unexpected response:", response);
      showModal('errorModal');
    }
  } catch (error) {
    console.error("Error:", error);
    showModal('errorModal');
  } finally {
    // Hide the loading text once the submission is done
    document.getElementById("loadingText").style.display = "none";

  }
}




function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";  // Show the modal
  } else {
    console.error("Modal not found: " + modalId);
  }
}


function closeForm() {
  document.getElementById("formModal").style.display = "none"; 
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";  
  }
}


  




