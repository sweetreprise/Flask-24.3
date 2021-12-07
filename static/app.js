const BASE_URL = " http://127.0.0.1:5000"

const $cupcakeList = $("#cupcakes-list")
const $cupcakeForm = $("#cupcake-form")

// populates html for a given cupcake
function renderCupcakes(cupcake) {
    return `
  
        <div class="card" data-cupcake-id="${cupcake.id}">
            <img class="card-img-top" src="${cupcake.image}" alt="cupcake image">
            <div class="card-body">
                <h5 class="card-title">${cupcake.flavor}</h5>
                <p class="card-text">
                    <ul>
                        <li>${cupcake.size}</li>
                        <li>${cupcake.rating}</li>
                    </ul>
                    <button class="delete btn btn-danger">Delete</button
                </p>
            </div
        </div
    `;
}

// gets cupcakes and displays to page
async function displayCupcakes() {
    const response = await axios.get(`${BASE_URL}/api/cupcakes`);

    for (let cupcake of response.data.cupcakes) {
        let newCupcake = renderCupcakes(cupcake)
        $cupcakeList.append(newCupcake)
    }
}

// form handling for adding a new cupcake
$cupcakeForm.on("submit", async function(e) {
    e.preventDefault();

    let flavor = $("#flavor").val();
    let rating = $("#rating").val();
    let size = $("#size").val();
    let image = $("#image").val();

    const response = await axios.post(`${BASE_URL}/api/cupcakes`, {flavor, rating, size, image});
    
    let newCupcake = renderCupcakes(response.data.cupcake);
    $cupcakeList.append(newCupcake);
    $cupcakeForm.trigger("reset");

});

// handles deleting a cupcake
$cupcakeList.on("click", ".delete", async function(e) {
    e.preventDefault();

    let $cupcake = $(e.target).closest('.card');
    let cupcakeId = $cupcake.attr("data-cupcake-id");

    await axios.delete(`${BASE_URL}/api/cupcakes/${cupcakeId}`);
    $cupcake.remove();

})

displayCupcakes();
