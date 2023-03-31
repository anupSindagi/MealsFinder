import { useGlobalContext } from '../context.jsx'
const Modal = () => {
    const { modal, onModalClose } = useGlobalContext();
    const ingredients = Object.keys(modal).filter(val => val.includes('strIngredient') && modal[val] && modal[val].length > 0).map(val => modal[val]);
    const measurements = Object.keys(modal).filter(val => val.includes('strMeasure') && modal[val] && modal[val].length > 0).map(val => modal[val]);
    return (
        <div className="absolute w-full h-full z-10 backdrop-grayscale backdrop-blur-sm" onClick={onModalClose}>
            <div id="modalWrapper" className="sticky top-0 overflow-y-scroll w-full h-screen flex items-center justify-center py-12 scrollbar-hide">
                <div className="flex flex-col justify-center w-[100vh] bg-slate-50 shadow-lg rounded-xl p-4 border-4 border-slate-200 my-auto">
                    <div className="h-[400px] bg-left bg-cover rounded-lg mx-4" style={{ backgroundImage: "url(" + modal.strMealThumb + ")" }}>
                        <h3 className="top-0 text-slate-80 text-3xl tracking-widest text-center py-4 bg-slate-300 opacity-70 rounded-lg">
                            {modal.strMeal}
                        </h3>
                    </div>
                    <div className='px-24 py-2 mx-4 flex justify-between bg-slate-200 mt-2 rounded-lg'>
                        <div className='flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2 stroke-slate-500 fill-slate-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                            </svg>
                            <div className="text-slate-700 text-md tracking-widest px-2"> {modal.strArea} </div>
                        </div>
                        {modal.strTags &&
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2 stroke-slate-500 fill-slate-200">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                                </svg>
                                <div className="text-slate-700 text-md tracking-widest px-2">{modal.strTags}</div>
                            </div>
                        }
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2 stroke-slate-500 fill-slate-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>


                            <div className="text-slate-700 text-md tracking-widest px-2">{modal.strCategory}</div>
                        </div>

                    </div>
                    <h4 className="text-slate-700 text-2xl tracking-widest text-center py-4">Instruction</h4>
                    <p className="text-slate-700 text-md tracking-wide text-justify py-2 px-6">{modal.strInstructions}</p>
                    <table className="table-fixed mx-4 mt-6 text-slate-700 tracking-wide bg-slate-100">
                        <thead>
                            <tr>
                                <th className="text-left font-normal text-xl tracking-widest py-3 px-4 border-8 border-slate-50 bg-slate-200">Ingridient</th>
                                <th className="text-right font-normal text-xl tracking-widest py-3 px-4 border-8 border-slate-50 bg-slate-200">Measurement</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.map((val, index) =>
                                <tr key={index}>
                                    <td className="text-left tracking-wide py-1 px-4 border-8 border-slate-50 ">
                                        {val}
                                    </td>
                                    <td className="text-right tracking-wide py-1 px-4 border-8 border-slate-50">
                                        {measurements[index]}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <iframe className='w-full h-96 px-6 my-3'
                        src={modal.strYoutube.replace('watch?v=','embed/')}>
                    </iframe>
                </div>
                <button id="modalCloseButton" className="top-0 place-self-start -ml-7 -mt-2" onClick={onModalClose}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-2 stroke-slate-500 fill-slate-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </button>
            </div>
        </div>
    );
}

export default Modal;