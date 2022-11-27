function recipeFactory(data) {
  const { name, description, time, ingredients } = data;

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
    recipeTime.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="black"/>
      </svg>
      <span>${time} min</span>`;

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