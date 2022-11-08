function recipeFactory(data) {
  const { name, description, time, ustensils, ingredients, id, appliance, servings } = data;

  function getIngredientsList() {
    const listDOM = document.createElement('ul');

    ingredients.forEach(item => {
      const listElement = document.createElement('li');
      const elementName = document.createElement('span');
      elementName.classList.add('ingredient-name');
      elementName.textContent = item.ingredient;
      listElement.appendChild(elementName);

      if(item.quantity) {
        const elementQuantity = document.createElement('span');
        elementQuantity.textContent = `: ${item.quantity} `;
        listElement.appendChild(elementQuantity);
      }

      if(item.unit) {
        const elementUnit = document.createElement('span');
        elementUnit.textContent = item.unit;
        listElement.appendChild(elementUnit);
      }

      listDOM.appendChild(listElement);
    })

    return listDOM
  }

  function getSingleRecipeDOM() {
    const article = document.createElement('article');
    article.classList.add('recipe');

    const recipePicture = document.createElement('div');
    recipePicture.classList.add('recipe-picture');

    const recipeHeader = document.createElement('div');
    recipeHeader.classList.add('infos-header');
    const recipeMain = document.createElement('div');
    recipeMain.classList.add('infos-main');

    const recipeInfos = document.createElement('div');
    recipeInfos.classList.add('recipe-infos');

    const recipeName = document.createElement('h2');
    recipeName.classList.add('recipe-name');
    recipeName.textContent = name;

    const recipeTime = document.createElement('p');
    recipeTime.classList.add('recipe-time');
    recipeTime.textContent = `${time} min`;

    const recipeIngredients = document.createElement('div');
    recipeIngredients.classList.add('recipe-ingredients');
    const ingredientsList = getIngredientsList();
    recipeIngredients.appendChild(ingredientsList);

    const recipeDescription = document.createElement('p');
    recipeDescription.classList.add('recipe-description');
    recipeDescription.textContent = description;

    recipeHeader.appendChild(recipeName);
    recipeHeader.appendChild(recipeTime);

    recipeMain.appendChild(recipeIngredients);
    recipeMain.appendChild(recipeDescription);

    recipeInfos.appendChild(recipeHeader);
    recipeInfos.appendChild(recipeMain);

    article.appendChild(recipePicture);
    article.appendChild(recipeInfos);

    return article
  }
  
  return { getSingleRecipeDOM }
}