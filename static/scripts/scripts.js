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
let menu = document.querySelector('.menu')


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


setTimeout(showPopup,3333,popup_reminder);
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
// window.addEventListener('scroll',function() {
//     if (window.scrollY > 400) {
//         menu.style.position = "fixed";
//     } else {
//       menu.style.position = "";
//     }
// });