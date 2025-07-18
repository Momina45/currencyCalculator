// const BASE_URL =
//     "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

//     const dropdowns = document.querySelectorAll(".dropdown select");
//     const btn = document.querySelector("button");
//     const fromCurr = document.querySelector(".from select");
//     const toCurr = document.querySelector(".to select");
//     const msg = document.querySelector(".msg");

// for (let select of dropdowns) {
//     for (code in countryList) {
//         let newOpt = document.createElement("option");
//         newOpt.innerText = code;
//         newOpt.value = code;
//         if(select.name === "from" && code === "USD"){
//             newOpt.selected = "selected";
//         }else if(select.name === "to" && code === "PK"){
//              newOpt.selected = "selected";
//         }
//         select.append(newOpt);
//     }
//     select.addEventListener("change",(evt) =>{
//         updateFlag(evt.target);
//     });
// };
// const updateFlag = (element) =>{
//     let code = element.value;
//     let countryCode = countryList[code];
//      let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//   let img = element.parentElement.querySelector("img");
//   img.src = newSrc;
// };
// updateExchangeRate = async() =>{
//     let amount = document.querySelector(".amount input");
//     let amtVal = amount.value;
//     if(amtVal=== " " || amtVal <= "1"){
//         amount.value = "1";
//         amtVal = 1;
//     }
//     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//     let response = await fetch(URL);
//     let data = await response.json();
//     let rate = data[toCurr.value.toLowerCase()];

//     let finalAmount = amount * rate;
//     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
// };
// btn.addEventListener("click", (evt) => {
//   evt.preventDefault();
//   updateExchangeRate();
// });

// window.addEventListener("load", () => {
//   updateExchangeRate();
// });

const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Check countryList exists
if (typeof countryList !== "object") {
  console.error("countryList is undefined. Please define it first.");
}

// Populate dropdowns
dropdowns.forEach((select) => {
  for (let code in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerText = code;
    newOpt.value = code;

    if (select.name === "from" && code === "USD") {
      newOpt.selected = true;
    } else if (select.name === "to" && code === "PKR") {
      newOpt.selected = true;
    }

    select.append(newOpt);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
});

// Flag updater
const updateFlag = (element) => {
  let code = element.value;
  let countryCode = countryList[code];
  if (!countryCode) return;

  let img = element.parentElement.querySelector("img");
  if (img) {
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  }
};

// Exchange rate updater
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = parseFloat(amount.value);

  if (isNaN(amtVal) || amtVal <= 0) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Failed to fetch exchange rate");

    const data = await response.json();

    const rate = data.rates[toCurr.value];
    if (!rate) {
      msg.innerText = "Conversion rate not available";
      return;
    }

    const finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate";
    console.error(error);
  }
};

// Trigger exchange update on button click
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// // Auto-fetch on load
// window.addEventListener("load", () => {
//   updateExchangeRate();
// });
