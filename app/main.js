import "./style.css";

const DOMSelectors = {
  container: document.querySelector("#app"),
};

function insertMainPage(data) {
  data.types.forEach((type) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="card">
      <button type="submit" class="">${type}</button>
    </div>`
    )
  );
}

async function getData() {
  //fetch returns a promise
  try {
    const response = await fetch("https://genshin.jmp.blue/");
    //guard clause
    if (response.status != 200) {
      throw new Error(response); //creates error state, pass through catch
    } else {
      const data = await response.json(); // turn into a json that we can work with
      insertMainPage(data);
    }
  } catch (error) {
    console.log(error);
    alert("sorry could not find object");
  }
  //wait for promise
}
getData();

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
