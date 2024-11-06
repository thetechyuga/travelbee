// let searchBtn = document.querySelector('#search-btn');
// let searchBar = document.querySelector('.search-bar-container');
// let formBtn = document.querySelector('#login-btn');
// let loginForm = document.querySelector('.login-form-container');
// let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () => {
 searchBtn.classList.remove('fa-times');
 searchBar.classList.remove('active');
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

var swiper = new Swiper(".review-slider", {
 spaceBetween: 20,
 loop:true,
 autoplay: {
  delay: 2500,
  disableOnInteraction: false,
 },
 breakpoints: {
  640: {
   slidesPerView: 1,
  },
  768: {
   slidesPerView: 2,
  },
  1024: {
   slidesPerView: 3,
  },
 },
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




   
   


//    window.onload = function() {
//     const videoBtn = document.querySelectorAll('.vid-btn');
  
//     videoBtn.forEach(btn => {
//       btn.addEventListener('click', () => {
//         document.querySelector('.controls .active').classList.remove('active');
//         btn.classList.add('active');
        
//         let src = btn.getAttribute('data-src');
//         document.querySelector('#video-slider').src = src;
//         document.querySelector('#video-slider').play();
//       });
//     });
//   };
  






