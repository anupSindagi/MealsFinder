import { useGlobalContext } from "../context"

const Meals =() => {
    const {meals, searchTerm, onModalClick, favorites} = useGlobalContext();

    return <section className="relative grid gap-4 grid-cols-1 bg-slate-100 h-full py-6 md:grid-cols-3 px-12 lg:px-32">
        {meals && meals.length > 0 && meals.map(meal => 
            <div className="relative w-300 bg-white m-3 mx-6 shadow rounded-lg cursor-pointer transition duration-500 opacity-90 hover:opacity-100 hover:scale-105" key={meal.idMeal} onClick={(e) => onModalClick(meal,e)} value={meal}>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 z-20 opacity-100 absolute bottom-7 right-7 fill-red-300 stroke-red-400 transition duration-500 hover:scale-125">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
                <img className="p-3 rounded-md " src={meal.strMealThumb}></img>
                <div className="absolute bottom-3 flex justify-center left-0 right-0 mx-3 py-2 h-54 bg-gray-300 opacity-70">
                    <h4 className="text-slate-900 font text-3xl tracking-widest self-place-center text-center items center my-2">
                        {meal.strMeal}
                    </h4>
                </div>   
            </div>)}
        {meals === null && <><div></div> <h3 className="flex text-slate-700 justify-center text-center text-2xl">Sorry, there are no matches.</h3></>}
        {console.log("favorites",favorites)}
    </section>
}

export default Meals