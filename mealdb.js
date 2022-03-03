//meal details jeheto clear krte display search e lagse tai globally dec
const mealDetails = document.getElementById('meal-deatls');
// search button clicked and fetch api

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    //clear search field
    searchField.value = '';
    //empty search error handling
    const error = document.getElementById('error')

    // meal details clear krar jonno
    mealDetails.textContent = ''
    // console.log(isNaN(searchText))
    if (typeof searchText != 'string' || searchText == '') {
        return error.innerText = 'Write your desire food name that you want.'
    }
    else if ((isNaN(searchText) == false)) {//searchText%1===0
        //false hoa mane nmb
        return error.innerText = 'you can not put any number'
    }
    else {

        //for clear error field
        error.innerText = '';
        // fetch api from mealdb
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearch(data.meals));
    }

}

// display search result 

const displaySearch = meals => {
    const searchResult = document.getElementById('search-result');
    // ager search list clear krte
    searchResult.textContent = '';
    // meal details clear krar jonno
    mealDetails.textContent = ''
    // error handling for not matching food
    if (meals === null) {
        error.innerText = 'This food is not available.'
    }
    // else if () {
    //     error.innerText = 'you can not put a number'
    // }
    else {
        meals.forEach(meal => {
            //console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100 mt-5">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
                    </div>
                </div>
            `
            searchResult.appendChild(div);
        });
    }

}

// food card e onclick krle food details 
const loadMealDetails = mealId => {
    //error clear krte
    error.innerText = '';
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]));
}
//display food details
const displayMealDetails = meal => {
    // console.log(meal);
    // const mealDetails = document.getElementById('meal-deatls');

    // ager search list clear krte
    mealDetails.textContent = ''
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
            </div>
        `
    mealDetails.appendChild(div);
}

