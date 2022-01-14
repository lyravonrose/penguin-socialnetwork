//-------- class notes -------// will delete later//

// const cryptoRandomString = require("crypto-random-string");

// const randomString = cryptoRandomString({ length: 8 });
// console.log(randomString);

// const bc = require("./bc,js");
// const db = require("./db.js");
// async function registerUser(email, password) {
//     bc.hash(password)
//         .then((hashedPassword) => {
//             return db.addUser(email, hashedPassword);
//         })
//         .then(() => {
//             res.json({ success: true });
//         });
// }
// ------------------------------------------------

// import { useEffect, useState } from "react";

// export function HooksDemo() {
//     const [name, setName] = useState("Onion");
//     const [email, setEmail] = useState();
//     const [password, setPassword] = useSate();
//     //first being state property(name), second being function, no binding necessary
//     useEffect(() => {
//         console.log("in use effect");
//     }, [password]);
//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//     };
//     const handleSubmit = (e) => {
//         e.preventDefault();
//     };
//     return (
//         <>
//             <h1>Hello, {name}</h1>
//             <input onChange={(e) => setName(e.target.value)} />
//             <form>
//                 <input
//                     type="email"
//                     name="email"
//                     onChange={handleEmailChange}
//                 ></input>
//                 <input
//                     type={"password"}
//                     name="password"
//                     onChange={(e) => setPassword(e.target.value)}
//                 ></input>
//             </form>
//         </>
//     );
// }
