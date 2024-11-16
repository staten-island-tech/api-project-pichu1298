import "./style.css";

const DOMSelectors = {
  container: document.querySelector("#app"),
};

function insertMainPage(data) {
  data.types.forEach((type) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<button type="submit" class="" id = "${type}">${type}</button>`
    )
  );
}

function mainPageButtons(data) {
  let mpgBtns = document.querySelectorAll("button");
  mpgBtns.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      DOMSelectors.container.innerHTML = "";
      const clickedButton = event.target;
      if (clickedButton.id === "artifacts") {
        getData("artifacts", "");
      } else if (clickedButton.id === "boss") {
        getData("boss", "");
      } else if (clickedButton.id === "characters") {
        getData("characters", "");
      } else if (clickedButton.id === "consumables") {
        getData("consumables", "");
      } else if (clickedButton.id === "domains") {
        getData("domains", "");
      } else if (clickedButton.id === "elements") {
        getData("elements", "");
      } else if (clickedButton.id === "enemies") {
        getData("enemies", "");
      } else if (clickedButton.id === "materials") {
        getData("materials", "");
      } else if (clickedButton.id === "nations") {
        getData("nations", "");
      } else if (clickedButton.id === "weapons") {
        getData("weapons", "");
      }
    });
  });
}

function twoPageButtons() {
  let secondaryButtons = document.querySelectorAll("button");
  secondaryButtons.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      const secondaryClicked = event.target;
      if (secondaryClicked.id === "") {
        //find a way to import this page that was clicked.
        //find a way to grab the ids of each sub category. Maybe ask chat gpt to do it for me, too lazy for rewriting the same line of code every single time.
      }
    });
  });
}

async function getData(p, l) {
  //fetch returns a promise
  try {
    const url = "https://genshin.jmp.blue/" + p + l;
    console.log(url);
    const responseTypes = await fetch(url);

    //guard clause
    if (responseTypes.status != 200) {
      throw new Error(responseTypes); //creates error state, pass through catch
    } else if (!p && !l) {
      //if the two parameters are empty run this
      const data = await responseTypes.json(); // turn into a json that we can work with
      insertMainPage(data);
      mainPageButtons(data);
    } else if (p && !l) {
      //if there is something in p and not l run this
      const data = await responseTypes.json();
      data.forEach((item) => {
        DOMSelectors.container.insertAdjacentHTML(
          //inserts secondary buttons
          "beforeend",
          `<button type="submit" class="" id = "${item}">${item}</button>`
        );
      });
    } else if (l) {
      //needs to be fixed for later, but basically if l exists in parameters.
      const data = await responseTypes.json();
      //try to fix this so it suits the format of each option later.
      data.forEach((item) => {
        DOMSelectors.container.insertAdjacentHTML(
          "beforeend",
          `<button type="submit" class="" id = "${item}">${item}</button>`
        );
      });
    }
  } catch (error) {
    console.log(error);
    alert("sorry could not find object");
  }
  //wait for promise
}
getData("", "");

// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
