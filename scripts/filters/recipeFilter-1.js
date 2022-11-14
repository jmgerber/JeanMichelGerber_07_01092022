const searchBar = document.getElementById('search');
const recipesSection = document.querySelector(".recipes-container");

async function initGlobalFilter(recipes) {
  const recipesData = recipes;

  searchBar.addEventListener('keyup', function(){
    globalSearch(recipesData);
  });
}

function globalSearch(recipesData) {
  if(searchBar.value.length > 2) {
    const filteredData = recipesData.filter(recipe => {
      // Recherche dans les ingrédients
      recipe.ingredients.forEach(item => {
        if (item.ingredient.includes(searchBar.value.toLowerCase())){
          return recipe
        }
      });
      // Recherche dans le nom ou la description
      if (recipe.name.includes(searchBar.value.toLowerCase()) || 
        recipe.description.includes(searchBar.value.toLowerCase())) {
        return recipe
      };
    });
    recipesSection.innerHTML = "";
    displayRecipes(filteredData);
  } else {
    recipesSection.innerHTML = "";
    displayRecipes(recipesData);
  }
}