
const toggolSpin = displayStyle => {
    //spin load
    document.getElementById('spin').style.display = displayStyle
}
const error = document.getElementById('error');
const searchFood = () => {
    // search button e click krle dui display clear
    document.getElementById('search-result').innerHTML = ''
    document.getElementById('meal-deatls').textContent = ''
    toggolSpin('block')
    const searchField = document.getElementById('search-field').value;
    if (searchField == '') {
        error.innerText = 'Write your desire food name'
    }
    else if (isNaN(searchField) == false) {
        error.innerText = 'you can not put a number'
    }
    else {
        //joto jagai data load hbe tar age error remove
        error.innerText = ''
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchField}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearch(data.meals));
    }
    document.getElementById('search-field').value = ''

}
const displaySearch = meals => {

    if (meals == null) {
        error.innerText = 'This is not available'
    }
    else {
        document.getElementById('spin').style.display = 'none'
        error.innerText = ''
        meals.forEach(meal => {
            const searchResult = document.getElementById('search-result')
            const div = document.createElement('div')
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
const loadMealDetails = mealId => {

    error.innerText = ''
    document.getElementById('meal-deatls').textContent = ''
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]));
    // console.log(id)
}
const displayMealDetails = meal => {

    const displayMealDetails = document.getElementById('meal-deatls')
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card">
                    <img height="500px" src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
            </div>
    </div>
    
    `
    displayMealDetails.appendChild(div);
}
