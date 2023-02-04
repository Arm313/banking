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
  displayMovements(acc.movements);

  calcDisplayBalance(acc);

  calcDisplaySumary(acc);
};

let currentAccount;

btn.addEventListener("click", function () {
  currentAccount = accounts.find((acc) => acc.username === loginUsername.value);

  if (currentAccount && currentAccount?.pin === +loginPassword.value) {
    console.log("login", currentAccount);
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }`;
    main.style.opacity = "1";

    loginUsername.value = loginPassword.value = "";

    loginPassword.blur();

    updateUI(currentAccount);
  } else alert("Login or Password is incorrect");
});

// btn.addEventListener("click", () => {
//   const createUsernames = function (accs) {
//     accs.forEach((acc) => {
//       acc.username = acc.owner
//         .toLowerCase()
//         .split(" ")
//         .map((name) => name[0])
//         .join("");
//       // console.log(acc.username);
//       if (
//         loginUsername.value === acc.username &&
//         +loginPassword.value === +acc.pin
//       ) {
//         main.style.opacity = "1";
//         return acc.username;
//       }
//       // else alert("username or PIN wrong");

//       // return acc.username
//     });
//   };

//   createUsernames(accounts);

//   //-----------------------------------------
//   //   const user = account1.owner;

//   //   const username = user
//   //     .toLowerCase()
//   //     .split(" ")
//   //     .map(name => name[0])
//   //     .join("");

//   //   if (
//   //     loginUsername.value === username &&
//   //     +loginPassword.value === +account1.pin
//   //   ) {
//   //     main.style.opacity = "1";
//   //   } else alert("username or PIN wrong");
//   //--------------------------------
//   //   let firstLetterOfTheName = accounts.map(function(val){
//   //     return val.owner.split(" ").map((val) => {
//   //         return val.slice(0,1)
//   //     })
//   //    })

//   //   let firstLetterOfTheName = account1.owner.split(" ").map((val) => {
//   //     return val.slice(0, 1);
//   //   });

//   //   if (
//   //     loginUsername.value.toLowerCase() ===
//   //       firstLetterOfTheName.join("").toLowerCase() &&
//   //     +loginPassword.value === +account1.pin
//   //   ) {
//   //     main.style.opacity = "1";
//   //   } else alert("username or PIN wrong");
//   //------------------------------------------------------
// });

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

labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);

// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

// const displayMovements = function (accs) {
//   conteinerMovements.textContent = ""; // .innerHTML

//   accs.forEach((mov) => {
//     let movements = mov.movements;
//     console.log(movements);

//     movements.forEach((val, i) => {
//       const type = val > 0 ? "deposit" : "withdrawal";

//       const html = `
//        <div class="movements__row">
//         <div class="movements__type movements__type--${type}">${
//         i + 1
//       } ${type}</div>
//         <div class="movements__value">${val} €</div>
//        </div>`;

//       conteinerMovements.insertAdjacentHTML("afterbegin", html);
//     });
//   });
// };
// // displayMovements(account1.movements);
// displayMovements(accounts);

const displayMovements = function (movements, sort = false) {
  conteinerMovements.textContent = ""; // .innerHTML

  const movs = sort ? movements.sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `

    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
        <div class="movements__value">${mov}€</div>
    </div>
        `;

    conteinerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};
// calcDisplayBalance(account1.movements);
// calcDisplayBalance(accounts)

const calcDisplaySumary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  lebelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  lebelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  lebelSumInterest.textContent = `${interest}€`;
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
    console.log(`transfer to ${amount} => ${receiverAcc.owner}`);

    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
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
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

let sorted = false;
btnSort.addEventListener("click", () => {
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
