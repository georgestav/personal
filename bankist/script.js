"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
let customUser = prompt("To login please provide your name and or surname");
if (customUser) {
	alert(
		"Thank you, please use your initials of the name/surname provided and pin 1111"
	);
} else {
	customUser = "Custom User";
	alert(
		"You did not enter a username of your choise, you can use 'cu' for Custom User and pin 1111"
	);
}
/////////////////////////////////////////////////
// Data

const account1 = {
	owner: "George Stavrou",
	movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
	interestRate: 1.2, // %
	pin: 1111,
	movementsDates: [
		"2019-11-02T09:04:17.178Z",
		"2019-12-23T07:42:02.383Z",
		"2020-01-28T09:15:04.904Z",
		"2020-04-01T10:17:24.185Z",
		"2021-05-08T14:11:59.604Z",
		"2021-11-01T17:01:17.194Z",
		"2021-11-02T04:36:17.929Z",
		"2021-11-03T09:27:17.178Z",
	],
	currency: "EUR",
	locale: "el-GR", // de-DE
};

const account1a = {
	owner: "Qiáozhì Stavrou Hraklis",
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300, -120],
	interestRate: 1.8, // %
	pin: 1122,
	movementsDates: [
		"2019-11-01T13:15:33.035Z",
		"2019-11-30T09:48:16.867Z",
		"2019-12-25T06:04:23.907Z",
		"2020-01-25T14:18:46.235Z",
		"2020-02-05T16:33:06.386Z",
		"2020-04-10T14:43:26.374Z",
		"2020-06-25T18:49:59.371Z",
		"2020-07-26T12:01:20.894Z",
		"2020-07-26T12:01:20.894Z",
	],
	currency: "HKD",
	locale: "zh-HK",
};

const account2 = {
	owner: customUser,
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 1111,
	movementsDates: [
		"2019-11-01T13:15:33.035Z",
		"2019-11-30T09:48:16.867Z",
		"2019-12-25T06:04:23.907Z",
		"2020-01-25T14:18:46.235Z",
		"2020-02-05T16:33:06.386Z",
		"2020-04-10T14:43:26.374Z",
		"2020-06-25T18:49:59.371Z",
		"2020-07-26T12:01:20.894Z",
	],
	currency: "EUR",
	locale: "fr-FR",
};

const account3 = {
	owner: "Steven Thomas Williams",
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
	movementsDates: [
		"2019-11-01T13:15:33.035Z",
		"2019-11-30T09:48:16.867Z",
		"2019-12-25T06:04:23.907Z",
		"2020-01-25T14:18:46.235Z",
		"2020-02-05T16:33:06.386Z",
		"2020-04-10T14:43:26.374Z",
		"2020-06-25T18:49:59.371Z",
		"2020-07-26T12:01:20.894Z",
	],
	currency: "GBP",
	locale: "en-GB",
};

const account4 = {
	owner: "Sarah Smith",
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
	movementsDates: [
		"2019-11-01T13:15:33.035Z",
		"2019-11-30T09:48:16.867Z",
		"2019-12-25T06:04:23.907Z",
		"2020-01-25T14:18:46.235Z",
		"2020-02-05T16:33:06.386Z",
	],
	currency: "EUR",
	locale: "es-ES",
};

const accounts = [account1, account1a, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//active account
let activeAccount = 0;
let timer;

//current date
const dateNow = function () {
	return new Date();
};

const writeDate = function () {
	//update date under current balace
	labelDate.textContent = `${new Intl.DateTimeFormat(activeAccount.locale, {
		hour: "numeric",
		hourCycle: "h24",
		minute: "numeric",
		second: "numeric",
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(dateNow())}`;
};

//username generation
const accUsernameGen = function (acc) {
	// function that takes in the array of accounts [acc1,acc2,acc3 ...]
	acc.forEach(function (user) {
		// for each of the acc1,acc2 array elements do the following function
		user.username = user.owner //user.username the new key-value added to the object after operation on user.owner
			.toLowerCase()
			.split(" ")
			.map((name) => name[0])
			.join("");
	});
};
accUsernameGen(accounts);

function updateUi() {
	balance();

	//display summary
	inOutTotals();

	//display movements
	addMovements(activeAccount.movements);

	//update hour
	dateNow();
	//write date
	writeDate();
}

//countdown timer to logout
function countdown() {
	//timer is set to 5 minutes
	let time = 60 * 5; //seconds
	function ticker() {
		return function () {
			let min = String(Math.trunc(time / 60)).padStart(2, 0); //convert to minutes
			let sec = String(time % 60).padStart(2, 0);
			//in each call, print the time remaining to the UI
			labelTimer.textContent = `${min}:${sec}`;

			//when it reaches 0, stop timer and logout user
			if (time === 0) {
				clearInterval(timer);
				//change opacity
				containerApp.style.opacity = "0";
				labelWelcome.textContent = "Log in to get started";
			}

			time--; //decrease by 1
		};
	}

	//call the timer every second
	ticker();
	const timer = setInterval(ticker(), 1000);
	document.body.addEventListener("click", function () {
		return (time = 60 * 5);
	});
	return timer;
}

//display currency depending on user selection
function currencyUser(input) {
	return new Intl.NumberFormat(activeAccount.locale, {
		style: "currency",
		currency: activeAccount.currency,
	}).format(input);
}
//display the transaction movements
function addMovements(movements, sort = false) {
	containerMovements.innerHTML = " ";

	const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

	movs.forEach(function (movement, i) {
		//date functionality

		let dateMovement = getMovementDate(i);

		const type = movement >= 0 ? "deposit" : "withdrawal";
		const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${dateMovement}</div>
    <div class="movements__value">${currencyUser(movement.toFixed(2))}</div>
  </div>`;

		containerMovements.insertAdjacentHTML("afterbegin", html);
	});
}

function getMovementDate(i) {
	let dateMovement = new Date(activeAccount.movementsDates[i]);
	let displayDate = function () {
		if (Math.abs(dateNow().getTime() - dateMovement.getTime()) < 60000) {
			return "Just now";
		} else if (dateNow().getFullYear() == dateMovement.getFullYear()) {
			if (dateNow().getDate() == dateMovement.getDate()) {
				return `${dateMovement.toLocaleDateString(
					activeAccount.locale,
					{
						hour: "numeric",
						hour12: false,
						minute: "numeric",
						weekday: "short",
						day: "numeric",
						month: "short",
					}
				)}`;
			} else {
				return `${Math.round(
					(dateNow().getTime() - dateMovement.getTime()) /
						(1000 * 60 * 60 * 24)
				)} days ago ${dateMovement.toLocaleDateString(
					activeAccount.locale,
					{
						weekday: "short",
						day: "numeric",
						month: "short",
					}
				)}`;
			}
		} else {
			return `${dateMovement.toLocaleDateString(activeAccount.locale)}`;
		}
	};
	// console.log(displayDate());
	return displayDate();
}

//current balance calculation
function balance() {
	activeAccount.balance = activeAccount.movements.reduce(
		(acc, mov) => acc + mov,
		0
	);

	labelBalance.textContent = `${currencyUser(
		activeAccount.balance.toFixed(2)
	)}`;
}

//calculate deposit, withdrawrals and the interest totals or 'in' and 'outs' and 'interest'
function inOutTotals() {
	activeAccount.in = activeAccount.movements
		.filter((ins) => ins > 0)
		.reduce((acc, ins) => acc + ins);
	activeAccount.out = activeAccount.movements
		.filter((outs) => outs < 0)
		.reduce((acc, outs) => acc + outs, 0);
	activeAccount.interest = activeAccount.movements
		.filter((ins) => ins > 0)
		.map((ins) => (ins * activeAccount.interestRate) / 100)
		.filter((ins) => ins >= 1)
		.reduce((acc, ins) => acc + ins);

	labelSumIn.textContent = `${currencyUser(activeAccount.in.toFixed(2))}`;
	labelSumOut.textContent = `${currencyUser(
		Math.abs(activeAccount.out).toFixed(2)
	)}`;
	labelSumInterest.textContent = `${currencyUser(
		activeAccount.interest.toFixed(2)
	)}`;
}

// login function
function login(e) {
	e.preventDefault(); //this prevent form from submitting and the page reloading

	const username = inputLoginUsername.value;
	const pin = inputLoginPin.value;

	function checkUsername(username) {
		activeAccount = accounts.find(function (acc) {
			if (username === acc?.username && +pin === acc?.pin) {
				return (containerApp.style.opacity = "100");
			}
		});

		if (timer) {
			clearInterval(timer);
		}
		timer = countdown();

		//clear input
		inputLoginUsername.value = inputLoginPin.value = "";
		//display welcome message
		labelWelcome.textContent = `Welcome back, ${
			activeAccount.owner.split(" ")[0]
		}`;
		//display balance
		updateUi();
		//start countdown
		countdown();
	}
	checkUsername(username);
}

//tranfer money function
function transfer(e) {
	e.preventDefault(); //this prevent form from submitting and the page reloading
	//find destUser, where the amount is transfered to
	const destUser = accounts.find(
		(acc) => acc.username === inputTransferTo.value
	);
	const amount = Math.abs(+inputTransferAmount.value);
	if (
		destUser &&
		destUser?.username !== activeAccount.username &&
		activeAccount.balance - amount >= 0
	) {
		activeAccount.movements.push(-amount); //amount added to array of movements of active user
		activeAccount.movementsDates.push(new Date().toISOString());
		destUser.movements.push(+amount);
		destUser.movementsDates.push(new Date().toISOString());
	} else {
		console.log(
			"Not allowed, account not found, or transfer exceeds acount balance"
		);
	}

	//clear input
	inputTransferTo.value = inputTransferAmount.value = "";

	updateUi();
}

//close account function
function closeAcc(e) {
	e.preventDefault(); //this prevent form from submitting and the page reloading
	const confUser = inputCloseUsername.value;
	const confPin = +inputClosePin.value;
	//clear input
	inputCloseUsername.value = inputClosePin.value = "";

	if (confUser === activeAccount.username && confPin === activeAccount.pin) {
		const indexOfAcc = accounts.findIndex(
			(acc) => acc.username === activeAccount.username
		);
		accounts.splice(indexOfAcc, 1);

		//display welcome message
		labelWelcome.textContent = `Your Account was deleted, ${
			activeAccount.owner.split(" ")[0]
		}`;
		//add opacity
		containerApp.style.opacity = "0";
	}
}

//request loan function
//yes if there is a deposit >10% of the requested amount
function rqstLoan(e) {
	e.preventDefault();
	const rqstAmount = Math.floor(inputLoanAmount.value);

	//timer to simulate delay of issuing a loan
	const randomDelay = function (min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	};
	setTimeout(() => {
		if (
			rqstAmount > 0 &&
			activeAccount.movements.some((d) => d >= rqstAmount * 0.1)
		) {
			activeAccount.movements.push(rqstAmount);
			activeAccount.movementsDates.push(new Date().toISOString());
		}
		updateUi();
	}, randomDelay(7000, 15000));
	inputLoanAmount.value = "";
}

//event handers
btnTransfer.addEventListener("click", transfer);
btnLogin.addEventListener("click", login);
btnClose.addEventListener("click", closeAcc);
btnLoan.addEventListener("click", rqstLoan);
let sorted = false;
btnSort.addEventListener("click", function (e) {
	e.preventDefault();
	addMovements(activeAccount.movements, !sorted);
	sorted = !sorted;
});
