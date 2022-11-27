const searchBar = document.getElementById('search');
const recipesSection = document.querySelector(".recipes-container");

searchBar.addEventListener('keyup', function(){
  search();
});

async function search() {
  let data = await recipesData
  // Si la recherche principale fait au minimum 2 caractères
  if(searchBar.value.length > 2){
    data = globalSearch(data);
  }

  // S'il y a des tags
  if (tagList.length > 0){
    data = specificSearch(data);
  }

  // On met à jour l'affichage
  recipesSection.innerHTML = "";
  initCategoriesFilter(data);
  displayRecipes(data);
}


async function initCategoriesFilter(data = recipesData) {
  data = (data == recipesData) ? await recipesData : data
  // Initialise ou met à jour les listes des filtres par catégorie
  initIngredientsList(data);
  initApplianceList(data);
  initUstensilsList(data);
}
initCategoriesFilter();

function globalSearch(recipesData) {
  const filteredData = recipesData.filter(recipe => {
    // Recherche dans les ingrédients
    recipe.ingredients.forEach(item => {
      if (item.ingredient.toLowerCase().includes(searchBar.value.toLowerCase())){
        return recipe
      }
    });
    // Recherche dans le nom ou la description
    if (recipe.name.toLowerCase().includes(searchBar.value.toLowerCase()) || 
      recipe.description.toLowerCase().includes(searchBar.value.toLowerCase())) {
      return recipe
    };
  });
  return filteredData
}

function specificSearch(data){
  const tagsFilteredData = data.filter(recipe => {
    let validCount = 0;
    tagList.forEach(tag => {
      if(tag.type === 'ingredient'){
        recipe.ingredients.forEach(item => {
          if (item.ingredient.toLowerCase() === tag.name){
            validCount++
          }
        });
      }
      if (tag.type === 'appliance'){
        if (recipe.appliance.toLowerCase() === tag.name) {
          validCount++
        }
      }
      if (tag.type === 'ustensil'){
        recipe.ustensils.forEach(item => {
          if (item.toLowerCase() === tag.name) {
            validCount++
          }
        });
      }
    });
    // Si la recette contient tous les tags, on la retourne
    if (validCount == tagList.length) {
      return recipe
    }
  });

  return tagsFilteredData
}