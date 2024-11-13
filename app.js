//
//gets data
// shows the data

//

async function getData() {
  //fetch returns a promise
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    //guard clause
    if (response.status != 200) {
      throw new Error(response); //creates error state, pass through catch
    } else {
      const data = await response.json(); // turn into a json that we can work with
      document.querySelector("h1").textContent = data.name;
    }
  } catch (error) {
    console.log(error);
    alert("sorry could not find that pocket monster");
  }
  //wait for promise

  console.log(response);
}
getData();
