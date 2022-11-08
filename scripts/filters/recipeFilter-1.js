const searchBar = document.getElementById('search');
const recipesSection = document.querySelector(".recipes-container");

async function initFilter(recipes) {
  const recipesData = recipes;

  searchBar.addEventListener('keyup', function() {
    if(searchBar.value.length > 2) {
      const filteredData = recipesData.filter(recipe => {
        // Recherche dans les ingrédients
        recipe.ingredients.forEach(item => {
          if (item.ingredient.includes(searchBar.value)){
            return recipe
          }
        });
        // Recherche dans le nom ou la description
        if (recipe.name.includes(searchBar.value) || 
          recipe.description.includes(searchBar.value)) {
          return recipe
        };
      });
      recipesSection.innerHTML = "";
      displayRecipes(filteredData);
    } else {
      recipesSection.innerHTML = "";
      displayRecipes(recipesData);
    }
  });
}