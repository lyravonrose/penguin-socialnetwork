import { Registration } from "./registration";
import { BrowserRouter, Route } from "react-router-dom";
import { Logo } from "./logo";
import { Login } from "./login";

export default function Welcome() {
    return (
        <>
            <Logo />
            <h1 className="reg">Welcome to Antartica 🐧</h1>
            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </div>
            </BrowserRouter>
        </>
    );
}
