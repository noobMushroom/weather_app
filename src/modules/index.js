import _ from "lodash";
import "../styles/style.scss";
import { weather } from "./weather";
import {background} from './background'

function main() {
  background()
  weather('london')
  const cityName = document.getElementById("cityName");
  const btn = document.getElementById("cityNameBtn");
  btn.addEventListener("click", () => {
    try {
      if (cityName.value===""){
        throw new Error("name required");
      }
      weather(cityName.value);
    } catch (error) {
      console.log(error);
    }
  });
}
main();
