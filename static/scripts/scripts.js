let popup_wrap = document.querySelector('.popup-wrap');
let popup_reminder = popup_wrap.querySelector('#popup-reminder');
let popup_gallery = popup_wrap.querySelector('#popup-gallery');
let popup_image = popup_gallery.querySelector('.popup__image');
let popup_form = popup_wrap.querySelector('#popup-form');

let current_image;
let opened_popup = null;
let formDate;

let before_button = document.querySelector('.popup__button_before');
let next_button = document.querySelector('.popup__button_next');
let close_button = document.querySelectorAll('.popup__button_close');

let form_caller = document.querySelector('.form-caller');
let menu = document.querySelector('.menu');
let fake_menu =  document.querySelector('.fake-menu');


function showPopup(popup) {
    if(opened_popup!=null){
        return;
    }
    popup.classList.add('popup__opened');
    opened_popup = popup;
    popup_wrap.classList.add('popup-wrap_visible');
}

function hidePopup() {
    opened_popup.classList.remove('popup__opened');
    opened_popup = null;
    popup_wrap.classList.remove('popup-wrap_visible');
}


function checkButtons(image){
    if (image.nextElementSibling==null){
        next_button.style.visibility='hidden';
    }else{
        next_button.style.visibility='visible';
    }
    if (image.previousElementSibling==null){
        before_button.style.visibility='hidden';
    }else{
        before_button.style.visibility='visible';
    }
}
function changePopupImage(){
    popup_image.src = "";
    popup_image.src =current_image.querySelector('.big-picture__image').src;
    checkButtons(current_image);
}
function showGallery(start_image){
    current_image=start_image;
    changePopupImage();
    showPopup(popup_gallery);
}
function showNext(){
    current_image = current_image.nextElementSibling;
    changePopupImage();
}

function showBefore(){
    current_image = current_image.previousElementSibling;
    changePopupImage();
}

let gallery = document.querySelector('.gallery').querySelectorAll('.big-picture');
gallery.forEach(function(item){item.addEventListener('click',showGallery.bind(this,item));});


popup_reminder.addEventListener('click',function(evt){evt.stopPropagation();});
popup_gallery.addEventListener('click',function(evt){evt.stopPropagation();});
popup_form.addEventListener('click',function(evt){evt.stopPropagation();});


setTimeout(showPopup,7777,popup_reminder);
popup_wrap.addEventListener('click',hidePopup);


form_caller.addEventListener('click',showPopup.bind(this,popup_form));

let form_number = popup_form.querySelector('#number_input');
let form_email = popup_form.querySelector('#email_input');
let form_button = popup_form.querySelector('.popup__form__submit-button');

function enableButton(){
    if(form_number.validity.valid && form_email.validity.valid){
        form_button.classList.remove('popup__form__submit-button_disabled');
    }else{
        form_button.classList.add('popup__form__submit-button_disabled');
    }

}

form_number.addEventListener('input',function(){enableButton();});
form_email.addEventListener('input',function(){enableButton();});


function postForm(){
    formData = new FormData(popup_form.querySelector('.popup__form'));

    form_button.textContent = "Submitting...";
    form_button.classList.add('popup__form__submit-button_disabled');

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: formData,
    })
    .then((response) => response.json())
    .then(()=>{
        for (const [key, value] of formData.entries()) {
            console.log(`${key} = ${value}`);
          }
        setTimeout(function(){
            form_button.classList.remove('popup__form__submit-button_disabled');
            form_button.classList.add('popup__form__submit-button_sent');
            form_button.textContent = "Submitted";
            setTimeout(function(){
                hidePopup();
                setTimeout(function(){
                    form_button.textContent = "Submit";
                    form_button.classList.remove('popup__form__submit-button_sent');
                },500);
            },1000)
        },600);
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
}

popup_form.addEventListener('submit',function(evt){
    evt.preventDefault();
    postForm();
})


window.addEventListener('scroll',function() {
    if (window.scrollY > window.innerHeight) {
        menu.classList.add('menu_fixed');
        fake_menu.style.display = 'block';
    } else {
      menu.classList.remove('menu_fixed');
      fake_menu.style.display = 'none';
    }
});

function startCountdown(targetDate,counter){
    let countdownInterval = setInterval(function(){
        let remaining = targetDate - new Date().getTime();

        let days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        let hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        counter.textContent = "Remaining " + days + "d " + hours + "h " 
                                         + minutes + "m " + seconds + "s";

        if(remaining < 0){
            clearInterval(countdownInterval);
            counter.textContent = 'Countdown Finished';
        }
    },1000)
}

window.onload=function(){
    let targetDate = new Date("June 1, 2024 00:00:00");
    let counter = document.querySelector('.counter');
    startCountdown(targetDate,counter);
}

const animation_space = document.querySelector('.animation');
let animated_images = animation_space.querySelectorAll('.animation__image');

const defaultPos = new Map();
animated_images.forEach(element=>{
    defaultPos.set(element,[element.getAttribute('cx'),element.getAttribute('cy')]);
});

animation_space.addEventListener('mousemove',event=>{
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    let container = animation_space.getBoundingClientRect();
    animated_images.forEach(element =>{
        const posX = Number(defaultPos.get(element).at(0));
        const posY = Number(defaultPos.get(element).at(1));
        let distanceX = mouseX - container.left - posX;
        let distanceY = mouseY - container.top - posY;
        let radius = Number(element.getAttribute('r'));

        if(radius<posX - 200/distanceX && posX - 200/distanceX < container.width - radius){
            element.setAttribute('cx',posX - 200/distanceX);
        }
        if(radius<posY -200/distanceY && posY - 200/distanceY < container.height - radius){
            element.setAttribute('cy',posY - 200/distanceY);
        }
    });
});
animation_space.addEventListener('mouseleave',resetAnimation());

function resetAnimation(){
    animated_images.forEach(element =>{
        element.setAttribute('cx',defaultPos.get(element).at(0));
        element.setAttribute('cy',defaultPos.get(element).at(1));
    });
}