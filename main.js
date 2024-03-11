(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-8",headers:{authorization:"bf3453d4-6543-4939-9470-d119c78326c0","Content-Type":"application/json"}};function t(t,n,r){var o=n.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__image"),a=o.querySelector(".card__title"),i=o.querySelector(".card__delete-button"),u=o.querySelector(".card__like-button"),s=o.querySelector(".card__likes");return c.src=t.link,c.alt=t.name,a.textContent=t.name,s.textContent=t.cardLikes.length,t.userId===t.ownerProfileId?i.addEventListener("click",(function(e){var n=e.target.closest(".places__item");t.deleteCard(n,t.cardId)})):i.remove(),t.cardLikes.forEach((function(e){t.userId===e._id&&u.classList.add("card__like-button_is-active")})),u.addEventListener("click",(function(n){!function(t,n,r){t.classList.contains("card__like-button_is-active")?function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(e){t.classList.remove("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(e){t.classList.add("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(e){console.log(e)}))}(n.target,t.cardId,s)})),c.addEventListener("click",(function(){r(t.link,t.name)})),o}function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function o(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}function c(e){e.target.classList.contains("popup")&&r(e.target)}var a=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){i(e,n,t)})),u(r,t)},i=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},u=function(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)};function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var l=document.querySelector("#card-template").content,d=document.querySelector(".places__list"),f=document.querySelectorAll(".popup"),p=document.querySelector(".popup_type_edit"),m=document.querySelector(".popup_type_new-card"),_=document.querySelector(".popup_type_edit-avatar"),v=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),h=document.querySelector(".profile__add-button"),b=document.querySelector(".profile__edit-button"),S=document.querySelector(".popup_type_image"),k=S.querySelector(".popup__image"),L=S.querySelector(".popup__caption"),q=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),g=document.querySelector(".profile__image"),C=document.forms["edit-profile"],j=C.elements.name,P=C.elements.description,A=document.forms["new-place"],I=A.elements["place-name"],w=A.elements.link,x=document.forms["edit-avatar"],U=x.elements.link,O=document.querySelector(".popup_type_delete-card"),T=document.forms["delete-card"],B="",D="",M="",N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};C.addEventListener("submit",(function(t){var n,o;t.preventDefault(),F(t.submitter,!0),(n=j.value,o=P.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){z(e.name,e.about),r(p)})).catch((function(e){console.log(e)})).finally((function(){F(t.submitter,!1)}))})),A.addEventListener("submit",(function(t){var n,o;t.preventDefault(),F(t.submitter,!0),(n=I.value,o=w.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var t={name:e.name,link:e.link,userId:B,ownerProfileId:e.owner._id,cardId:e._id,cardLikes:e.likes,deleteCard:J};H(t),r(m)})).catch((function(e){console.log(e)})).finally((function(){F(t.submitter,!1)}))})),x.addEventListener("submit",(function(t){var n;t.preventDefault(),F(t.submitter,!0),(n=U.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){$(e.avatar),r(_)})).catch((function(e){console.log(e)})).finally((function(){F(t.submitter,!1)}))})),T.addEventListener("submit",(function(t){t.preventDefault(),function(t){return fetch("".concat(e.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(D).then((function(){M.remove(),r(O)})).catch((function(e){console.log(e)}))}));var J=function(e,t){D=t,M=e,n(O)},H=function(e){var n=t(e,l,V);d.prepend(n)};function V(e,t){k.src=e,k.alt=t,L.textContent=t,n(S)}function z(e,t){q.textContent=e,E.textContent=t}function $(e){g.style.backgroundImage="url('".concat(e,"')")}function F(e,t){e.textContent=t?"Сохранение...":"Сохранить"}f.forEach((function(e){e.classList.add("popup_is-animated"),e.querySelector(".popup__close").addEventListener("click",(function(){r(e)})),e.addEventListener("click",c)})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];B=c._id,a.forEach((function(e){var n,r;n={name:e.name,link:e.link,userId:B,ownerProfileId:e.owner._id,cardId:e._id,cardLikes:e.likes,deleteCard:J},r=t(n,l,V),d.append(r)})),function(e,t,n){z(e,t),$(n)}(c.name,c.about,c.avatar)})).catch((function(e){console.log(e)})),h.addEventListener("click",(function(){A.reset(),a(A,N),n(m)})),b.addEventListener("click",(function(){j.value=v.textContent,P.value=y.textContent,n(p),a(p,N)})),g.addEventListener("click",(function(){x.reset(),n(_),a(_,N)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?i(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}(n,r,t)}))}))}(t,e)}))}(N)})();