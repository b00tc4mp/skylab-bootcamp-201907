COMPONENTS

- App
    - Footer

    - Landing
        - Header
        - Login / Register & Random Recipe   
        - Register User
            - Form
            - Submit
            - Back
        - Register Success
            - GoLogin
        - Login
            - Form
            - Submit
            - Back 

    - Home
        - Header / Search / Logout / Favorites   
        - Results / Favorites / Back
        - Recipe detail / Favorites / Back
        - Categories

LOGIC

- retrieve recipe
- toggle favorite meals
- retrieve user
- random recipe
- search by name
- search by category
- search by ingredient
- validate
- register user
- authenticate user

  
API

    By name
    https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

    By category
    https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

    By main ingredient
    https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

    TODO - By multi ingredient
    https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast,garlic,salt
