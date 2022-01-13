// import React from "react";

// export default class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             btnTxt: "",
//         };
//     }
//     componentDidMount() {
//         console.log("grandchild just mounted😃", this.props);
//         if (this.props.favoriteSweet) {
//             this.setState({
//                 btnTxt: "edit",
//             });
//         } else {
//             this.setState({ btnTxt: "add," });
//         }
//     }
//     render() {
//         return (
//             <>
//                 <h1>I am the grand child</h1>;
//                 <h2>
//                     Grand Parents favorite sweet in app.js is: {""}
//                     {this.props.favoriteSweet}
//                 </h2>
//                 <button>{this.state.btnText}</button>
//                 <textarea defaultValue={this.props.favoriteSweet}></textarea>;
//             </>
//         );
//     }
// }
