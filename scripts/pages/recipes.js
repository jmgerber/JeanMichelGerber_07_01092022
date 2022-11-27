const recipesData = getRecipes();

async function displayRecipes(data = recipesData) {
  data = (data == recipesData) ? await recipesData : data
  const recipesSection = document.querySelector(".recipes-container");

  data.forEach((media) => {
  const recipeModel = recipeFactory(media);
  const singleRecipeDOM = recipeModel.getSingleRecipeDOM();
  recipesSection.appendChild(singleRecipeDOM);
  });
}

displayRecipes();