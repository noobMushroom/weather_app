import _ from "lodash";
import "../styles/style.scss";
import { weather } from "./weather";
import { bgHandler } from './background'

function main() {
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
}
main();
