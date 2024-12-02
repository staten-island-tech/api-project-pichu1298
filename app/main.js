import "./style.css";
let firstClickedButton = "";
let secondClickedButton = "";
let thirdClickedButton = "";
const DOMSelectors = {
  container: document.querySelector("#app"),
};

function insertMainPage(data) {
  data.types.forEach((type) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<button type="submit" class="btn" id = "${type}">${type}</button>`
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
      getData(firstClickedButton.id, "", "");
    });
  });
}

function twoPageButtons() {
  let secondaryButtons = document.querySelectorAll("button");
  secondaryButtons.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      secondClickedButton = event.target;
      getData(firstClickedButton.id, "/" + secondClickedButton.id, "");
      //find a way to import this page that was clicked.
      //find a way to grab the ids of each sub category. Maybe ask chat gpt to do it for me, too lazy for rewriting the same line of code every single time.
    });
  });
}

function threePageButtons() {
  let thirdButtons = document.querySelectorAll("button");
  thirdButtons.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      thirdClickedButton = event.target;
      getData(
        firstClickedButton.id,
        "/" + secondClickedButton.id,
        "/" + thirdClickedButton.id
      );
    });
  });
}

function artifactLoading(data) {
  DOMSelectors.container.innerHTML = "";
  DOMSelectors.container.insertAdjacentHTML(
    "beforeend",
    `<div class = "card">
        <h1>Name: ${data.name}</h1>
        <img src="" alt="">
        <h2>Max Rarity: ${data["max_rarity"]}</h2>
        <h2>2 Piece Bonus: ${data["2-piece_bonus"]}</h2>
        <h2>4 Piece Bonus: ${data["4-piece_bonus"]}</h2>
      </div>`
  );
}

function nationsLoading(data, imgNation) {
  DOMSelectors.container.innerHTML = "";
  DOMSelectors.container.insertAdjacentHTML(
    "beforeend",
    `<div id = "card">
          <h1>Name: ${data.name} </h1>
          <img src="${imgNation}" alt="">
          <h2>Element: ${data.element}</h2>
          <h2>Archon: ${data.archon} </h2>
          <h2>Controlling Entity: ${data.controllingEntity}</h2>
        </div>`
  );
}
function weeklyBossesLoading(data) {
  // Clear the container
  DOMSelectors.container.innerHTML = "";

  // Build the initial HTML
  let htmlBosses = `
      <div class="card">
        <h1>Name: ${data.name}</h1>
        <h2>Description</h2>
        <p>${data.description}</p>
        <h2>Drops:</h2>
        <ul>
    `;

  // Add the drops
  data.drops.forEach((drop) => {
    htmlBosses += `
        <li>
          <strong>Name:</strong> ${drop.name}<br>
          <strong>Rarity:</strong> ${drop.rarity}<br>
          <strong>Source:</strong> ${drop.source}
        </li>
      `;
  });

  htmlBosses += `</ul><h2>Artifacts:</h2><ul>`;

  // Add the artifacts
  data.artifacts.forEach((artifact) => {
    htmlBosses += `
        <li>
          <strong>Name:</strong> ${artifact.name}<br>
          <strong>Max Rarity:</strong> ${artifact.max_rarity}
        </li>
      `;
  });

  // Close the card
  htmlBosses += `</ul></div>`;

  // Insert the final HTML
  DOMSelectors.container.insertAdjacentHTML("beforeend", htmlBosses);
}

function charactersLoading(data, imgURL) {
  const visionColors = {
    Pyro: "bg-pyro-primary",
    Hydro: "bg-hydro-primary",
    Electro: "bg-electro-primary",
    Cryo: "bg-cryo-primary",
    Anemo: "bg-anemo-primary",
    Geo: "bg-geo-primary",
    Dendro: "bg-dendro-primary",
  };
  const visionClass = visionColors[data.vision] || "bg-gray-200";
  DOMSelectors.container.innerHTML = "";
  let htmlCharactersProfileCard = `
  <div class = "${visionClass} p-4 rounded text-white w-[100%]">
        <h1>Name: ${data.name}</h1>
        <h2>Title: ${data.title}</h2>
        <h2>Vision: ${data.vision}</h2>
        <h2>Weapon: ${data.weapon}</h2>
        <h2>Gender: ${data.gender}</h2>
        <h2>Nation: ${data.nation}</h2>
        <h2>Affiliation: ${data.affiliation}</h2>
        <h2>Rarity: ${data.rarity}</h2>
        <h2>Release: ${data.release}</h2>
        <h2>Constellation: ${data.constellation}</h2>
        <h2>Birthday: ${data.birthday}</h2>
        <h2>Description</h2>
        <p>${data.description}</p>
        <img src="${imgURL}" alt="">
        </div>`;

  DOMSelectors.container.insertAdjacentHTML(
    "beforeend",
    htmlCharactersProfileCard
  );
  let htmlCharactersSkillCards = ``; // Initialize empty string to store cards
  // Loop through skill talents
  data.skillTalents.forEach((talent) => {
    htmlCharactersSkillCards += `
    <div class="${visionClass} p-4 m-4 rounded text-white w-[30%]" id = "card">
      <h2>Skill Talent</h2>
      <h3>Name: ${talent.name}</h3>
      <h4>Type: ${talent.unlock}</h4>
      <h4>Description</h4>
      <p>${talent.description}</p>
      <h4>Damage Percentages</h4>`;

    // Loop through upgrades within each talent and add them as a list
    talent.upgrades.forEach((upgrade) => {
      htmlCharactersSkillCards += `
      <ul>
        <li>Name: ${upgrade.name}</li>
        <li>Value: ${upgrade.value}</li>
      </ul>`;
    });

    htmlCharactersSkillCards += `</div>`; // Close each card
  });

  DOMSelectors.container.insertAdjacentHTML(
    "beforeend",
    htmlCharactersSkillCards
  ); // Insert the final HTML into the container

  data.passiveTalents.forEach((talent) => {
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="${visionClass} p-4 m-4 rounded text-white w-[45%]" id = "card">
          <h3>Passive Talent Name: ${talent.name}</h3>
          <h4>Unlock: ${talent.unlock}</h4>
          <h4>Description:</h4>
          <p>${talent.description}</p>
        </div>
      `
    );
  });

  data.constellations.forEach((constellation) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class = "${visionClass} p-4 m-4 rounded text-white w-[30%]" id = "card">
        <h2>Name: ${constellation.name}</h2>
    <h2>Unlock: ${constellation.unlock}</h2>
    <h3>Description</h3>
    <p>${constellation.description}</p>
    </div>`
    )
  );
  let htmlAscensionMaterialsCards = ``; // Container for all the cards

  // Loop through each ascension level (level_20, level_40, etc.)
  for (let level in data.ascension_materials) {
    htmlAscensionMaterialsCards += `
    <div class="${visionClass} p-4 m-4 rounded text-white w-[30%]" id = "card">
      <h3>Materials for ${
        level.replace(/_/g, " ").charAt(0).toUpperCase() + level.slice(1)
      }:</h3>
      <ul>
    `;

    // Loop through each material in that level and add it to the card
    data.ascension_materials[level].forEach((material) => {
      htmlAscensionMaterialsCards += `
      <li><strong>${material.name}</strong>: ${material.value}</li>
    `;
    });

    htmlAscensionMaterialsCards += `
      </ul>
    </div>
    `;
  }

  // Insert the generated HTML into your container
  DOMSelectors.container.insertAdjacentHTML(
    "beforeend",
    htmlAscensionMaterialsCards
  );
}

function foodLoading(data) {
  console.log(DOMSelectors.filterButtons);

  const rarityColors = {
    1: "bg-oneStar-primary",
    2: "bg-twoStar-primary",
    3: "bg-threeStar-primary",
    4: "bg-fourStar-primary",
    5: "bg-fiveStar-primary",
  };

  DOMSelectors.container.innerHTML = ""; // Clear container before loading new data
  let foodArray = Object.entries(data).filter(([key, value]) => key !== "id");
  // Get all food items
  let htmlFood = ``; // Initialize the HTML string

  // Loop through all filtered food items
  foodArray.forEach(([key, food]) => {
    // Generate image URL dynamically based on food name
    let imageUrl = `https://genshin.jmp.blue/consumables/food/${key}`;

    // Get the rarity class
    let rarityClass = rarityColors[food.rarity] || "bg-gray-200";

    // Build HTML for each food item
    htmlFood += `
      <div class="p-4 m-4 rounded w-[30%] ${rarityClass}" id="card">
        <h1>Name: ${food.name}</h1>
        <h2>Rarity: ${food.rarity}</h2>
        <h2>Type: ${food.type}</h2>
        <h2>Effect: ${food.effect}</h2>
        <h2>Proficiency: ${food.proficiency}</h2>
        <h2>Can player cook recipe: ${food.hasRecipe ? "Yes" : "No"}</h2>
        <h2>Description:</h2>
        <p>${food.description}</p>
        <img src="${imageUrl}" alt="Image not found." />
        <h2>Event obtained in: ${food.event || "N/A"}</h2>
    `;

    // If food has a recipe, display it
    if (food.hasRecipe && Array.isArray(food.recipe)) {
      htmlFood += `<h2>Recipe</h2>`;
      food.recipe.forEach((item) => {
        htmlFood += `
          <ul>
            <li><strong>${item.item}</strong>: ${item.quantity}</li>
          </ul>
        `;
      });
    }

    htmlFood += `</div>`; // Close each food item div
  });

  // Insert the final HTML into the container
  DOMSelectors.container.insertAdjacentHTML("beforeend", htmlFood);
}

// Convert the object to an array of food items
// const foodItems = Object.values(data); // Get an array of the values (food items)

// foodItems.forEach((food) => {
//   htmlFood += `
//         <div class="card">
//           <h1>Name: ${food.name}</h1>
//           <h2>Rarity: ${food.rarity}</h2>
//           <h2>Type: ${food.type}</h2>
//           <h2>Effect: ${food.effect}</h2>
//           <h2>Can player cook recipe: ${food.hasRecipe}</h2>
//           <h2>Description</h2>
//           <p>${food.description}</p>
//           <h2>Event obtained in: ${food.event || "N/A"}</h2>
//       `;

//   // Check if the food item has a recipe and if recipe is an array
//   if (food.hasRecipe === true && Array.isArray(food.recipe)) {
//     htmlFood += `<h2>Recipe</h2>`;
//     food.recipe.forEach(
//       (item) =>
//         (htmlFood += `
//         <ul>
//           <li><strong>${item.item}</strong>: ${item.quantity}</li>
//         </ul>`)
//     );
//   }

//   htmlFood += `</div>`;
//   DOMSelectors.container.insertAdjacentHTML("beforeend", htmlFood);
// });

function potionsLoading(data) {
  DOMSelectors.container.innerHTML = "";

  // Extract key-value pairs from the data object
  const potionsData = Object.entries(data).filter(
    ([key, value]) => key !== "id"
  );

  // Initialize an empty string to hold the HTML
  let htmlPotions = ``;
  let link = "https://genshin.jmp.blue/consumables/potions/";
  // Loop through each entry (key-value pair)
  potionsData.forEach(([key, potion]) => {
    console.log("Key:", key); // Logs the potion key
    console.log("Potion:", potion); // Logs the potion object

    htmlPotions += `
      <div class="card p-4 m-4 rounded w-[30%] bg-gray-100">
        <h1 class="text-lg font-bold">Name: ${potion.name}</h1>
        <img src="${link + key}" alt="">
        <h2 class="text-sm">Effect: ${potion.effect}</h2>
        <h2 class="text-sm">Rarity: ${potion.rarity}</h2>
        <h2 class="font-semibold mt-2">Crafting Materials:</h2>
        <ul>
    `;

    // Check if crafting exists and is an array
    if (Array.isArray(potion.crafting)) {
      potion.crafting.forEach((item) => {
        htmlPotions += `
          <li>${item.item}: <strong>${item.quantity}</strong></li>
        `;
      });
    } else {
      htmlPotions += `<li>No crafting materials found.</li>`;
    }

    htmlPotions += `
        </ul>
      </div>
    `;
  });

  // Insert the generated HTML into the DOM
  DOMSelectors.container.insertAdjacentHTML("beforeend", htmlPotions);
}

// function domainsLoading(data) {
//   if (p === "domains") {
//     //Write the domain stuff down.
//     //Check previous code for references
//     //Format should be in index
//   }
// }
// function elementLoading(data) {
//   if (p === "element") {
//   }
// }
// function enemiesLoading(data) {
//   if (p === "enemies") {
//   }
// }
// function bossMatLoading(data) {
//   if (k === "/boss-material") {
//   }
// }

// function charAscensionMatLoading(data) {
//   if (k === "/character-ascension") {
//   }
// }

// function characterExperienceMatLoading(data) {
//   if (k === "/character-experience") {
//   }
// }

// function commonAscensionMatLoading(data) {
//   if (k === "/common-ascension") {
//   }
// }

// function cookingIngredientsMatLoading(data) {
//   if (k === "/cooking-ingredients") {
//   }
// }

// function localSpecialtiesMatLoading(data) {
//   if (k === "/local-specialties") {
//   }
// }

// function talentBookMatLoading(data) {
//   if (k === "/talent-book") {
//   }
// }

// function talentBossMatLoading(data) {
//   if (k === "/talent-boss") {
//   }
// }

// function weaponAscensionMatLoading(data) {
//   if (k === "/weapon-ascension") {
//   }
// }

// function weaponExperienceMatLoading(data) {
//   if (k === "/weapon-experience") {
//   }
// }

// function weaoponLoading(data) {
//   if (p === "weapons") {
//   }
// }

async function getData(p, k, l) {
  //fetch returns a promise
  try {
    const url = "https://genshin.jmp.blue/" + p + k + l;
    console.log(url);
    const responseTypes = await fetch(url);

    //guard clause
    if (responseTypes.status != 200) {
      throw new Error(responseTypes); //creates error state, pass through catch
    } else if (!p && !l && !k) {
      //if the two parameters are empty run this
      let data = await responseTypes.json(); // turn into a json that we can work with
      console.log(data);
      insertMainPage(data);
      mainPageButtons(data);
    } else if (p && !k && !l) {
      console.log(p);
      //if there is something in p and not l run this
      let data = await responseTypes.json();
      console.log(data);
      data.forEach((item) => {
        DOMSelectors.container.insertAdjacentHTML(
          //inserts secondary buttons
          "beforeend",
          `<button type="submit" class="btn" id = "${item}">${item}</button>`
        );
      });
      twoPageButtons();
    } else if (k === "/weekly-boss" && !l) {
      let data = await responseTypes.json();
      console.log(data);
      data.forEach((item) => {
        DOMSelectors.container.insertAdjacentHTML(
          //inserts secondary buttons
          "beforeend",
          `<button type="submit" class="btn" id = "${item}">${item}</button>`
        );
      });
      threePageButtons();
    } else if (p && k) {
      //if l and p both exist.
      //needs to be fixed for later, but basically if l exists in parameters.
      let data = await responseTypes.json();
      //try to fix this so it suits the format of each option later.
      if (p === "nations") {
        console.log("Nations accepted");
        let imgNation = url + "/icon";
        nationsLoading(data, imgNation);
      } else if (p === "artifacts") {
        artifactLoading(data);
      } else if (k === "/weekly-boss") {
        weeklyBossesLoading(data);
      } else if (p === "characters") {
        let imgURL = url + "/gacha-splash";
        charactersLoading(data, imgURL);

        console.log(getData);
      } else if (k === "/food") {
        console.log("to be soon");
        foodLoading(data);
      } else if (k === "/potions") {
        console.log("to be soon");
        potionsLoading(data);
      }
    } else if (p && k && !l) {
      let data = await responseTypes.json();
      //if first two options exist but l does not.
      data.forEach((item) => {
        DOMSelectors.container.insertAdjacentHTML(
          //inserts secondary buttons
          "beforeend",
          `<button type="submit" class="btn" id = "${item}">${item}</button>`
        );
      });
      threePageButtons();
    }
  } catch (error) {
    console.log(error);
    alert("sorry could not find object");
  }
  //wait for promise
}
getData("", "", "");

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
