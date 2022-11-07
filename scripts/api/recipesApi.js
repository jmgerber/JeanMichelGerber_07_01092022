async function getRecipes() {
  const response = await fetch('data/recipes.js');
    if(response.ok){
      const recipes = await response.json();
      return recipes
    } else {
      console.error(`Returned error : ${response.status}`);
    }
}