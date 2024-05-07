let popup_wrap = document.querySelector('.popup-wrap');
let popup_reminder = popup_wrap.querySelector('#popup-reminder');
let popup_gallery = popup_wrap.querySelector('#popup-gallery');
let popup_image = popup_gallery.querySelector('.popup__image');
let current_image;

let before_button = document.querySelector('.popup__button_before');
let next_button = document.querySelector('.popup__button_next');
let close_button = document.querySelectorAll('.popup__button_close');

function showPopup(popup) {
    popup.classList.add('popup__opened');
    popup_wrap.classList.add('popup-wrap_visible');
}

function hidePopup() {
    popup_reminder.classList.remove('popup__opened');
    popup_gallery.classList.remove('popup__opened');
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

popup_reminder.addEventListener('click',function(evt){evt.stopPropagation();});
popup_gallery.addEventListener('click',function(evt){evt.stopPropagation();});

setTimeout(showPopup,333,popup_reminder);
popup_wrap.addEventListener('click',hidePopup);


let gallery = document.querySelector('.gallery').querySelectorAll('.big-picture');
gallery.forEach(function(item){item.addEventListener('click',showGallery.bind(this,item));});
