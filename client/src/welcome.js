import { Registration } from "./registration";
import { BrowserRouter, Route } from "react-router-dom";
import { Logo } from "./logo";
import { Login } from "./login";
import { ResetPassword } from "./resetPassword";

export default function Welcome() {
    return (
        <>
            <div className="regi">
                <Logo />
                <h1 className="reg">Welcome to PenguinHub 🐧</h1>
                <BrowserRouter>
                    <div>
                        <Route exact path="/">
                            <Registration />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/reset">
                            <ResetPassword />
                        </Route>
                    </div>
                </BrowserRouter>
            </div>
        </>
    );
}
