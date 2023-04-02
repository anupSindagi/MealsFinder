import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [modal,setModal] = useState(null)
    const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    const [meals, setMeals] = useState([])
    const [searchTerm, setSearchTerm] = useState(null)
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || [{"idMeal":"53065","strMeal":"Sushi","strDrinkAlternate":null,"strCategory":"Seafood","strArea":"Japanese","strInstructions":"STEP 1\r\nTO MAKE SUSHI ROLLS: Pat out some rice. Lay a nori sheet on the mat, shiny-side down. Dip your hands in the vinegared water, then pat handfuls of rice on top in a 1cm thick layer, leaving the furthest edge from you clear.\r\n\r\nSTEP 2\r\nSpread over some Japanese mayonnaise. Use a spoon to spread out a thin layer of mayonnaise down the middle of the rice.\r\n\r\nSTEP 3\r\nAdd the filling. Get your child to top the mayonnaise with a line of their favourite fillings – here we’ve used tuna and cucumber.\r\n\r\nSTEP 4\r\nRoll it up. Lift the edge of the mat over the rice, applying a little pressure to keep everything in a tight roll.\r\n\r\nSTEP 5\r\nStick down the sides like a stamp. When you get to the edge without any rice, brush with a little water and continue to roll into a tight roll.\r\n\r\nSTEP 6\r\nWrap in cling film. Remove the mat and roll tightly in cling film before a grown-up cuts the sushi into thick slices, then unravel the cling film.\r\n\r\nSTEP 7\r\nTO MAKE PRESSED SUSHI: Layer over some smoked salmon. Line a loaf tin with cling film, then place a thin layer of smoked salmon inside on top of the cling film.\r\n\r\nSTEP 8\r\nCover with rice and press down. Press about 3cm of rice over the fish, fold the cling film over and press down as much as you can, using another tin if you have one.\r\n\r\nSTEP 9\r\nTip it out like a sandcastle. Turn block of sushi onto a chopping board. Get a grown-up to cut into fingers, then remove the cling film.\r\n\r\nSTEP 10\r\nTO MAKE SUSHI BALLS: Choose your topping. Get a small square of cling film and place a topping, like half a prawn or a small piece of smoked salmon, on it. Use damp hands to roll walnut-sized balls of rice and place on the topping.\r\n\r\nSTEP 11\r\nMake into tight balls. Bring the corners of the cling film together and tighten into balls by twisting it up, then unwrap and serve.","strMealThumb":"https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg","strTags":null,"strYoutube":"https://www.youtube.com/watch?v=ub68OxEypaY","strIngredient1":"Sushi Rice","strIngredient2":"Rice wine","strIngredient3":"Caster Sugar","strIngredient4":"Mayonnaise","strIngredient5":"Rice wine","strIngredient6":"Soy Sauce","strIngredient7":"Cucumber","strIngredient8":"","strIngredient9":"","strIngredient10":"","strIngredient11":"","strIngredient12":"","strIngredient13":"","strIngredient14":"","strIngredient15":"","strIngredient16":"","strIngredient17":"","strIngredient18":"","strIngredient19":"","strIngredient20":"","strMeasure1":"300ml ","strMeasure2":"100ml","strMeasure3":"2 tbs","strMeasure4":"3 tbs","strMeasure5":"1 tbs","strMeasure6":"1 tbs","strMeasure7":"1","strMeasure8":" ","strMeasure9":" ","strMeasure10":" ","strMeasure11":" ","strMeasure12":" ","strMeasure13":" ","strMeasure14":" ","strMeasure15":" ","strMeasure16":" ","strMeasure17":" ","strMeasure18":" ","strMeasure19":" ","strMeasure20":" ","strSource":"https://www.bbcgoodfood.com/recipes/simple-sushi","strImageSource":null,"strCreativeCommonsConfirmed":null,"dateModified":null},{"idMeal":"52929","strMeal":"Timbits","strDrinkAlternate":null,"strCategory":"Dessert","strArea":"Canadian","strInstructions":"Sift together dry ingredients.\r\nMix together wet ingredients and incorporate into dry. Stir until smooth.\r\nDrop by teaspoonfuls(no bigger) into hot oil (365 degrees, no hotter), turning after a few moments until golden brown on all sides.\r\nRemove and drain.\r\nRoll in cinnamon sugar while still warm and serve.","strMealThumb":"https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg","strTags":"Snack,Treat","strYoutube":"https://www.youtube.com/watch?v=fFLn1h80AGQ","strIngredient1":"Flour","strIngredient2":"Sugar","strIngredient3":"Baking Powder","strIngredient4":"Salt","strIngredient5":"Egg","strIngredient6":"Milk","strIngredient7":"Oil","strIngredient8":"Oil","strIngredient9":"Icing Sugar","strIngredient10":"","strIngredient11":"","strIngredient12":"","strIngredient13":"","strIngredient14":"","strIngredient15":"","strIngredient16":"","strIngredient17":"","strIngredient18":"","strIngredient19":"","strIngredient20":"","strMeasure1":"2 cups ","strMeasure2":"1/3 cup","strMeasure3":"3 tsp","strMeasure4":"½ tsp","strMeasure5":"1 beaten","strMeasure6":"¾ cup","strMeasure7":"3 tbs","strMeasure8":"for frying","strMeasure9":"garnish","strMeasure10":"","strMeasure11":"","strMeasure12":"","strMeasure13":"","strMeasure14":"","strMeasure15":"","strMeasure16":"","strMeasure17":"","strMeasure18":"","strMeasure19":"","strMeasure20":"","strSource":"http://www.geniuskitchen.com/recipe/drop-doughnuts-133877","strImageSource":null,"strCreativeCommonsConfirmed":null,"dateModified":null}])

    const onRandomMeal = () => {
        const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
        axios.get(randomMealUrl)
          .then(function (response) {
            // handle success
            console.log(response.data.meals[0]);
            setModal(response.data.meals[0]);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
    }
    const onSearchSubmit = (event) => {
        event.preventDefault()
        setSearchTerm(searchTerm);
    }

    const onSearchChange = (event) => {
        event.preventDefault()
        //console.log(event)
        setSearchTerm (event.target.value)
        //console.log(allMealsUrl+searchTerm)
    }
    
    const fetchMeals = async (url) => {
        console.log("in fetchmeal ", url)
        try {
            const {data } =  await axios(url)
            setMeals(data.meals)
            console.log(data)
        } catch (e) {
            console.log(e.response)
        }
    }

    const onModalClick = (meal, event, favoriteDelete) => {
        //console.log("modal event ", event)
        //console.log("event target", event.target)
        if(["path","svg"].includes(event.target.tagName)) {
            if(favoriteDelete) {
                console.log("favorite delete");
                let newFavorites = favorites;
                let deleteIndex;
                newFavorites.forEach((fav, index) => {
                    if(fav['idMeal'] === meal.idMeal) deleteIndex = index;
                })
                newFavorites.splice(deleteIndex,1);
                console.log(newFavorites);
                setFavorites(f => [...newFavorites]);
                return;
            }
            if(Object.keys(favorites).some(val => favorites[val].idMeal === meal.idMeal)) return;
            else setFavorites(f => [...f,meal])
        }
        else {
            setModal(meal);
        }  
    }

    const onModalClose =(event) => {
        if(event.target.id === "modalWrapper" || event.currentTarget.id === "modalCloseButton") setModal(null);
    }

    useEffect(() => {
        console.log("in useeffect", favorites)
        localStorage.setItem("favorites", JSON.stringify(favorites));
    },[favorites, setFavorites])
    
    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    useEffect(() => {
        //console.log(searchTerm)
        if (typeof searchTerm !== 'string') return;
        //console.log(`${allMealsUrl}${searchTerm}`)
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])


    return (
        <AppContext.Provider value={{meals, onModalClick, modal, onModalClose, searchTerm, setSearchTerm, onSearchSubmit, onSearchChange, onRandomMeal, favorites, setFavorites}}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }