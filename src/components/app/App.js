import { BrowserRouter, Route, Routes } from "react-router-dom/dist";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../pages";

export const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>} />
                        <Route path="/comics" element={<ComicsPage/>} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}