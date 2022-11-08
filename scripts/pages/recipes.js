async function displayRecipes(recipesData) {
  const recipesSection = document.querySelector(".recipes-container");

  recipesData.forEach((media) => {
    const recipeModel = recipeFactory(media);
    const singleRecipeDOM = recipeModel.getSingleRecipeDOM();
    recipesSection.appendChild(singleRecipeDOM);
  });
}

async function initRecipes() {
  const recipesData = await getRecipes();
  displayRecipes(recipesData);
  initFilter(recipesData);
}

initRecipes()