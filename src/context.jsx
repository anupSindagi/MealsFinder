import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [modal,setModal] = useState(null)
    const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    const [meals, setMeals] = useState([])
    const [searchTerm, setSearchTerm] = useState(null)
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || [])

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