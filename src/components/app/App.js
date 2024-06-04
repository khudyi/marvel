import { BrowserRouter, Route, Routes } from "react-router-dom/dist";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, SingleComics } from "../pages";

export const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>} />
                        <Route path="/comics" element={<ComicsPage/>} />
                        <Route path="/comics/:comicsId" element={<SingleComics/>} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}