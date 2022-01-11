import { Registration } from "./registration";
import { Logo } from "./logo";

export default function Welcome() {
    return (
        <>
            <Logo />
            <h1 className="reg">Welcome to Antartica 🐧</h1>
            <Registration />
        </>
    );
}
