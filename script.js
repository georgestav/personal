//connected
"use strict";

const modal = document.querySelector(".modal"),
	overlay = document.querySelector(".overlay"),
	btnCloseModal = document.querySelector(".close-modal"),
	btnOpenModal = document.querySelector(".show-modal"),
	projects = document.querySelectorAll(".proj__image");

//update the copyright date
const date = document.querySelector(".date");
date.innerHTML = new Date().getFullYear();

function modalwindow() {
	//add event listener to the button to open the modal window
	btnOpenModal.addEventListener("click", function (e) {
		e.preventDefault;
		modal.classList.remove("hidden"); //remove hidden class to reveal the element
		overlay.classList.remove("hidden"); //remove hidden class to reveal the element
	});
	//function to close the modal
	function closeModal() {
		modal.classList.add("hidden"); //add hidden class to hide the element
		overlay.classList.add("hidden"); //add hidden class to hide the element
	}
	//add event listener to the X button in order to close the modal window
	btnCloseModal.addEventListener("click", closeModal);
	//add event listener to close the modal window when esc is pressed down
	document.addEventListener("keydown", function (e) {
		e.preventDefault;
		if (e.key === "Escape" && !modal.classList.contains("hidden"))
			closeModal();
	});
	// close modal if click is outside the overlay
	overlay.addEventListener("click", closeModal);
}
modalwindow();

// project images, show text on hover

function hoverImages() {
	for (const each of projects) {
		each.addEventListener("mouseenter", function () {
			this.classList.add("mouseover");
			if (this.parentElement.nextElementSibling) {
				return this.parentElement.nextElementSibling.classList.remove(
					"hide"
				);
			} else {
				return;
			}
		});
		each.addEventListener("mouseleave", function () {
			this.classList.remove("mouseover");
			if (this.parentElement.nextElementSibling) {
				return this.parentElement.nextElementSibling.classList.add(
					"hide"
				);
			} else {
				return;
			}
		});
	}
}
hoverImages();

console.log("💙 Programming is real fun isn't it?");
