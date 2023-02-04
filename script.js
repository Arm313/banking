const loginUsername = document.querySelector(".login--user");
const loginPassword = document.querySelector(".login--pin");
const btn = document.querySelector(".login__btn");
const main = document.querySelector(".app");
const labelDate = document.querySelector(".date");
const labelWelcome = document.querySelector(".welcome");

const labelBalance = document.querySelector(".balance__value");
const conteinerMovements = document.querySelector(".movements");

const lebelSumIn = document.querySelector(".summary__value--in");
const lebelSumOut = document.querySelector(".summary__value--out");
const lebelSumInterest = document.querySelector(".summary__value--interest");

const btnTransfer = document.querySelector(".form__btn--transfer");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");

const btnClose = document.querySelector(".form__btn--close");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const btnLoan = document.querySelector(".form__btn--loan");

const btnSort = document.querySelector(".btn--sort");
const labelTimer = document.querySelector(".timer");

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 45, -300, 25000, -640, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-01-28T09:15:04.904Z",
    "2019-04-01T10:17:24.185Z",
    "2019-05-27T17:01:17.194Z",
    "2019-07-11T23:36:17.929Z",
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-03-08T14:11:59.604Z",
    "2020-03-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-01-25T14:18:46.235Z",
    "2019-02-05T16:33:06.386Z",
    "2019-03-10T14:43:26.374Z",
    "2019-04-25T18:49:59.371Z",
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-02-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const account3 = {
  owner: "Arman Babujyan",
  movements: [3000, 2100, -1500, -700, -3200, -1000, 8500, 2200],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-03-10T14:43:26.374Z",
    "2022-04-25T18:49:59.371Z",
    "2022-05-01T13:15:33.035Z",
    "2022-08-10T09:48:16.867Z",
    "2022-08-11T06:04:23.907Z",
    "2022-08-12T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3];

const createUsernames = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
    // console.log(acc.username);
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  displayMovements(acc);

  calcDisplayBalance(acc);

  calcDisplaySumary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;


    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      main.style.opacity = "0";
    }
    time--;

  };

  let time = 120;

  tick();
  const timer = setInterval(tick, 1000);
  return timer
};

let currentAccount, timer;

btn.addEventListener("click", function () {
  currentAccount = accounts.find((acc) => acc.username === loginUsername.value);

  if (currentAccount && currentAccount?.pin === +loginPassword.value) {
    console.log("login", currentAccount);
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }`;
    main.style.opacity = "1";

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    const now = new Date();

    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long", // numeric,  long,   2-digit,   short
      year: "numeric",
      weekday: "short",
    };
    const locale = navigator.language;
    // console.log(locale);

    
    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );

    loginUsername.value = loginPassword.value = "";

    loginPassword.blur();


        if(timer) clearInterval(timer)

    timer = startLogOutTimer();

    updateUI(currentAccount);
  } else alert("Login or Password is incorrect");
});

const formatMovementsDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
};

const displayMovements = function (acc, sort = false) {
  conteinerMovements.textContent = ""; // .innerHTML

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementsDate(date);

    const html = `
  
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">
            ${i + 1} ${type} 
        </div>
         <div class="movements__date">${displayDate}</div>
         <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>
          `;

    conteinerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
};

const calcDisplaySumary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  lebelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  lebelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  lebelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

btnTransfer.addEventListener("click", () => {
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    setTimeout(function () {
      console.log(`transfer to ${amount} => ${receiverAcc.owner}`);

      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);

      clearInterval(timer)
      timer = startLogOutTimer()
    }, 2500);
  }
});

btnClose.addEventListener("click", () => {
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log();
    `this index ${index} user ${currentAccount.owner} deleted`;

    accounts.splice(index, 1);
    main.style.opacity = "0";
  }
});

btnLoan.addEventListener("click", () => {
  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some((mov) => amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount);

      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);

      clearInterval(timer)
      timer = startLogOutTimer()

    }, 2500);
  }
  inputLoanAmount.value = "";
});

let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

