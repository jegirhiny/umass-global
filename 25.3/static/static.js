function getCupcakes() {
  axios.get("/api/cupcakes").then(function (response) {
    $("#cupcake-list").empty();
    response.data.cupcakes.forEach(function (cupcake) {
      $("#cupcake-list").append(
        `<li>${cupcake.flavor} - ${cupcake.size} - ${cupcake.rating}</li>
        <img src="${cupcake.image}" alt="${cupcake.flavor} Flavor" style="width: 100px;"/>`
      );
    });
  }).catch(function (error) {
    console.error("Error fetching cupcakes:", error);
  });
}

$("#cupcake-form").submit(function (e) {
  e.preventDefault();

  let flavor = $("#flavor").val();
  let size = $("#size").val();
  let rating = $("#rating").val();
  let image = $("#image").val();

  axios.post("/api/cupcakes", {
    flavor: flavor,
    size: size,
    rating: rating,
    image: image,
  }).then(function (response) {
    $("#cupcake-list").append(
      `<li>${response.data.cupcake.flavor} - ${response.data.cupcake.size}</li>`
    );
    
    e.target.reset();
  }).catch(function (error) {
    console.error("Error adding cupcake:", error);
  });
});

$(document).ready(function () {
  getCupcakes();
});
