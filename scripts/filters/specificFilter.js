const specificFilterButtons = document.querySelectorAll('.specific-filter');
const ingredientInput = document.querySelector('.ingredient-input');
const applianceInput = document.querySelector('.appliance-input');
const ustensilInput = document.querySelector('.ustensil-input');

let tagList = [];

// Ouvre le menu de recherche par catégorie lorsque l'on clique dessus
specificFilterButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    if (button.classList.contains('close')){
      // On ferme les autres menus s'ils sont ouverts
      specificFilterButtons.forEach(button => {
        button.classList.remove('open');
        button.classList.add('close');
        button.children[0].style.display = "inline-block";
        button.children[1].style.display = "none";
      })
      // On ouvre le menu cliqué
      button.classList.remove('close');
      button.classList.add('open');
      button.children[0].style.display = "none";
      button.children[1].style.display = "inline-block";
    }
    event.stopPropagation();
  });
});

// Ferme le menu de recherche par catégorie lorsque l'on clique autre part sur la fenêtre
document.addEventListener("click", function() {
  specificFilterButtons.forEach(button => {
    if (button.classList.contains('open')){
      button.classList.remove('open');
      button.classList.add('close');
      button.children[0].style.display = "inline-block";
      button.children[1].style.display = "none";
    }
  });
});

function initIngredientsList(recipes) {
  // On récupère tous les ingrédients dans un tableau
  let rawIngredientsList = [];
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(item => rawIngredientsList.push(item.ingredient.toLowerCase()));
  });

  // On supprime les doublons
  const listData = rawIngredientsList.reduce(function(acc, currentValue) {
    if(acc.indexOf(currentValue) === -1) {
      acc.push(currentValue);
    }
    return acc
  }, []);

  // On met à jour la liste lorsque l'utilisateur entre une recherche d'ingrédient
  ingredientInput.addEventListener('keyup', function() {
    const filteredListData = listData.filter(item => {
      if (item.includes(ingredientInput.value.toLowerCase())){
        return item
      }
    });
    // Affiche la liste MaJ
    displayIngredientsList(filteredListData);
  });

  if(!ingredientInput.value){
    displayIngredientsList(listData);
  }
}

function displayIngredientsList(listData){
  const ingredientsListContainer = document.querySelector('.ingredients-list');
  const ingredientListDOM = document.createElement('ul');

  listData.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    listItem.addEventListener('click', function() {
      addToTags({name : item, type: "ingredient"});
    });
    ingredientListDOM.appendChild(listItem);
  });

  ingredientsListContainer.innerHTML = "";
  ingredientsListContainer.appendChild(ingredientListDOM);
}

function initApplianceList(recipes) {
  // On récupère tous les appareils dans un tableau
  let rawApplianceList = [];
  recipes.forEach(recipe => rawApplianceList.push(recipe.appliance.toLowerCase()));

  // On supprime les doublons
  const listData = rawApplianceList.reduce(function(acc, currentValue) {
    if(acc.indexOf(currentValue) === -1) {
      acc.push(currentValue);
    }
    return acc
  }, []);

  // On met à jour la liste lorsque l'utilisateur entre une recherche d'appareil
  applianceInput.addEventListener('keyup', function() {
    const filteredListData = listData.filter(item => {
      if (item.includes(applianceInput.value.toLowerCase())) {
        return item
      }
    });
    // Affiche la liste MaJ
    displayApplianceList(filteredListData);
  });

  if(!applianceInput.value){
    displayApplianceList(listData);
  }
}

function displayApplianceList(listData){
  const applianceListContainer = document.querySelector('.appliance-list')
  const applianceListDOM = document.createElement('ul');

  listData.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    listItem.addEventListener('click', function() {
      addToTags({name : item, type : "appliance"});
    });
    applianceListDOM.appendChild(listItem);
  });

  applianceListContainer.innerHTML = "";
  applianceListContainer.appendChild(applianceListDOM);
}

function initUstensilsList(recipes) {
  // On récupère tous les ustensiles dans un tableau
  let rawUstensilsList = [];
  recipes.forEach(recipe => {
    recipe.ustensils.forEach(item => rawUstensilsList.push(item.toLowerCase()));
  });

  // On supprime les doublons
  const listData = rawUstensilsList.reduce(function(acc, currentValue){
    if(acc.indexOf(currentValue) === -1) {
      acc.push(currentValue)
    }
    return acc
  }, []);

  // On met à jour la liste lorsque l'utilisateur entre une recherche d'ustensile
  ustensilInput.addEventListener('keyup', function() {
    const filteredListData = listData.filter(item => {
      if (item.includes(ustensilInput.value.toLowerCase())) {
        return item
      }
    });
    // Affiche la liste MaJ
    displayUstensilsList(filteredListData);
  });
  
  if (!ustensilInput.value) {
    displayUstensilsList(listData);
  }
}

function displayUstensilsList(listData){
  const ustensilListContainer = document.querySelector('.ustensils-list');
  const ustensilListDOM = document.createElement('ul');

  listData.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    listItem.addEventListener('click', function() {
      addToTags({name : item, type : "ustensil"});
    });
    ustensilListDOM.appendChild(listItem);
  });

  ustensilListContainer.innerHTML = "";
  ustensilListContainer.appendChild(ustensilListDOM);
}


/* Gestion des TAGS */

function addToTags(tag) {
  // Ajoute le tag s'il n'existe pas encore dans la liste
  if (!tagList.find(element => element.name === tag.name)){
    tagList.push(tag);
    displayTags();
    search();
  }
}

function displayTags() {
  // Affiche la liste de tags
  const tagsContainer = document.querySelector('.tags-container');
  tagsContainer.innerHTML = "";
  tagList.forEach(tag => {
    const tagCard = document.createElement('div');
    tagCard.innerHTML = tag.name;
    tagCard.classList.add("tags");
    tagCard.classList.add(tag.type);

    tagCard.addEventListener('click', function() {
      deleteOneTag(this.textContent);
      displayTags();
    });
    tagsContainer.appendChild(tagCard);
  });
}

function deleteOneTag(tagName) {
  // Supprime le tag et met à jour la liste
  const updatedtagList = tagList.filter(tag => tag.name != tagName);
  tagList = updatedtagList;
  search();
}