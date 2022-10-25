import _ from "lodash";
import "../styles/style.scss";
import { weather } from "./weather";

(function main() {
  weather('tokyo')
  const cityName = document.getElementById("cityName");
  const btn = document.getElementById("cityNameBtn");
  btn.addEventListener("click", () => {
    try {
      if (cityName.value === "") {
        throw new Error("name required");
      }
      weather(cityName.value);
    } catch (error) {
      console.log(error);
    }
  });
})()

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
(function startTime() {
  setTimeout(startTime, 500)
  let today = new Date(),
      h = today.getHours(),
      m = today.getMinutes(),
      s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  let clock = document.getElementById('clock')
  clock.innerHTML = h + ":" + m + ":" + s;
})()


function date() {
  setTimeout(date, 500)
  const calender = document.getElementById('dateDiv')
  const { format } = require('date-fns');
  const today = format(new Date(), 'EEEE MMMM do yyyy');
  calender.innerHTML = today
}
date()

