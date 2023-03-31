import { useGlobalContext } from "../context"

const Favorites = () => {
    const {favorites, onModalClick} = useGlobalContext();
    
    return (
        <div className="flex z-10 flex-col bg-slate-900 w-full h-60">
            <h4 className="text-slate-300 flex flex-row font-light justify-center text-3xl tracking-widest my-3 ">
                favorites
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 mx-1 pt-1.5 fill-slate-300 stroke-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            </h4>
            <div className="flex flex-row space-x-8 justify-center my-2" >
                {favorites.map(fav =>
                  <div className="bg-left w-32 h-32 bg-cover rounded-full outline outline-4 outline-slate-50 cursor-pointer transition duration-500 opacity-90 hover:opacity-100 hover:scale-105" style={{ backgroundImage: "url(" + fav.strMealThumb + ")" }} onClick={(e) => onModalClick(fav,e,true)}>
                        <div className="h-16"></div>
                        <p className="w-32 h-16 truncate pt-3 pl-1.5 rounded-b-full text-slate-800 text tracking-widest text-center bg-slate-300 opacity-80 ">
                            {fav.strMeal}
                        </p>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-28 -mb-6 w-6 h-6 stroke-slate-50 transition duration-500 hover:scale-125">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>   
                )}
            </div>
            
            
        </div>
    );
}

export default Favorites;