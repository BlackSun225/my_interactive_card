const cardNumber = document.getElementById("cardnumber");
const cardOwnerName = document.getElementById("l");
const monthYearValidity = document.getElementById("r");
const cardCvc = document.querySelector("#cardback > div:last-child");

var tempMonth = "00";
var tempYear = "00";

const form = document.querySelector("#right > form");
const submitBtn = document.querySelector("#submitBtn");
const thanks = document.getElementById("thanks");
const next = document.querySelector("#thanks button");

const cname = document.getElementById("cname");
const cnameAlert = document.querySelector("#cname + div");
const number = document.getElementById("number");
const numberAlert = document.querySelector("#number + .alert");
const month = document.getElementById("month");
const year = document.getElementById("year");
const monthAndYearAlert = document.querySelector(".l .alert");
const cvc = document.getElementById("cvc");
const cvcAlert = document.querySelector("#cvc + .alert");

const buttons = document.querySelectorAll("button");

var checkCname, checkNumber, checkMonth, checkYear, checkCvc = false;

const numberRegexp = /\d/;
const letterRegexp = /[a-zA-Z]+/;
const actualYearLastTwoDigit = new Date().getFullYear().toString().slice(2);
const actualMonth = new Date().getMonth() + 1;

cname.addEventListener("input", event => {
  let val = event.target.value;
  if(val != "" && !numberRegexp.test(val) && letterRegexp.test(val)) {
    cnameAlert.style.display = "none";
    cardOwnerName.innerText = val.toUpperCase();
    checkCname = true;
  }else{
    checkCname = false;
    cardOwnerName.innerText = "JANE APPLESEED";
    cnameAlert.style.display = "block";
    cnameAlert.innerText = "Wrong format, only letters";
  }
});

number.addEventListener("input", event => {
  let val = event.target.value;
  if(val != "" && numberRegexp.test(val) && !letterRegexp.test(val)) {
    numberAlert.style.display = "none";
    cardNumber.innerText = val;
    checkNumber = true;
  }else{
    checkNumber = false;
    cardNumber.innerText = "0000 0000 0000 0000";
    numberAlert.style.display = "block";
    numberAlert.innerText = "Wrong format, only numbers";
  }
});

number.addEventListener("blur", event => {
  let val = event.target.value;
  if(val.length != 19) {
    numberAlert.style.display = "block";
    numberAlert.innerText = "Card number must contain 16 numbers and space between them";
  }
});

month.addEventListener("input", event => {
  let val = event.target.value;
  if(val != "" && parseInt(val) >= actualMonth && parseInt(val) <=12 && numberRegexp.test(val) && !letterRegexp.test(val)) {
    monthAndYearAlert.style.display = "none";
    val = val.length < 2 ? "0" + val : val;
    tempMonth = val;
    monthYearValidity.innerText = tempMonth + "/" + tempYear;
    checkMonth = true;
  }else{
    monthYearValidity.innerText = "00/00";
    monthAndYearAlert.style.display = "block";
    monthAndYearAlert.innerText = "Wrong format, only number less than 13 and greater than the actual month";
    checkMonth = false;
  }
});

year.addEventListener("input", event => {
  let val = event.target.value;
  if(val != "" && parseInt(val) >= parseInt(actualYearLastTwoDigit) && numberRegexp.test(val) && !letterRegexp.test(val)) {
    monthAndYearAlert.style.display = "none";
    val = val.length < 2 ? "0" + val : val;
    tempYear = val;
    monthYearValidity.innerText = tempMonth + "/" + tempYear;
    checkYear = true;
  }else{
    monthYearValidity.innerText = "00/00";
    monthAndYearAlert.style.display = "block";
    monthAndYearAlert.innerText = "Wrong format, only number greater than the last 2 digit of the actual year";
    checkYear = false;
  }
});

cvc.addEventListener("input", event => {
  let val = event.target.value;
  if(val != "" && parseInt(val) >= 1 && numberRegexp.test(val) && !letterRegexp.test(val)) {
    cvcAlert.style.display = "none";
    if(val.length == 1) {
      val = "00" + val;
    }else if(val.length == 2) {
      val = "0" + val;
    }
    cardCvc.innerText = val;
    checkCvc = true;
  }else{
    cardCvc.innerText = "000";
    cvcAlert.style.display = "block";
    cvcAlert.innerText = "Wrong format, only number greater than 0";
    checkCvc = false;
  }
});

submitBtn.addEventListener("click", event => {
  event.preventDefault();
  if(checkCname && checkNumber && checkMonth && checkYear && checkCvc) {
    form.style.display = "none";
    thanks.style.display = "block";
  }
});

next.addEventListener("click", event => {
  event.preventDefault();
  thanks.style.display = "none";
  cname.value = "";
  number.value = "";
  month.value = "";
  year.value = "";
  cvc.value = "";
  form.style.display = "block";
});

buttons.forEach(elem => {
  elem.addEventListener("mousedown", event => {
    event.target.style.transform = "scale(95%)";
  });

  elem.addEventListener("mouseup", event => {
    event.target.style.transform = "scale(100%)";
  });
});

