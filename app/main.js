import "./style.css";
let firstClickedButton = "";
let secondClickedButton = "";
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

function mainPageButtons() {
  let mpgBtns = document.querySelectorAll("button");
  mpgBtns.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      DOMSelectors.container.innerHTML = "";
      firstClickedButton = event.target;
      getData(firstClickedButton.id, "");
    });
  });
}

function twoPageButtons() {
  let secondaryButtons = document.querySelectorAll("button");
  secondaryButtons.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      secondClickedButton = event.target;
      getData(firstClickedButton.id, "/" + secondClickedButton.id);
      //find a way to import this page that was clicked.
      //find a way to grab the ids of each sub category. Maybe ask chat gpt to do it for me, too lazy for rewriting the same line of code every single time.
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
      let data = await responseTypes.json(); // turn into a json that we can work with
      console.log(data);
      insertMainPage(data);
      mainPageButtons(data);
    } else if (p && !l) {
      //if there is something in p and not l run this
      let data = await responseTypes.json();
      data.forEach((item) => {
        DOMSelectors.container.insertAdjacentHTML(
          //inserts secondary buttons
          "beforeend",
          `<button type="submit" class="" id = "${item}">${item}</button>`
        );
      });
      twoPageButtons();
    } else if (l) {
      //needs to be fixed for later, but basically if l exists in parameters.
      let data = await responseTypes.json();
      //try to fix this so it suits the format of each option later.
      if (p === "nations") {
        DOMSelectors.container.innerHTML = "";
        DOMSelectors.container.insertAdjacentHTML(
          "beforeend",
          `<div id = "card">
          <h1>Name: ${data.name} </h1>
          <h2>Element: ${data.element}</h2>
          <h2>Archon: ${data.archon} </h2>
          <h2>Controlling Entity: ${data.controllingEntity}</h2>
        </div>`
        );
      } else if (p === "artifacts") {
        DOMSelectors.container.innerHTML = "";
        DOMSelectors.container.insertAdjacentHTML(
          "beforeend",
          `<div class = "card">
        <h1>Name: ${data.name}</h1>
        <h2>Max Rarity: ${data.max_rarity}</h2>
        <h2>2 Piece Bonus: ${data["2-piece_bonus"]}</h2>
        <h2>4 Piece Bonus: sdfgdf</h2>
      </div>`
        );
      }
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
