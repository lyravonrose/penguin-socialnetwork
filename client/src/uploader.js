import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // updateImgUrl(){

    // }
    render() {
        return (
            <div className="modal">
                <h3 onClick={() => !this.props.toggleUploader}>X</h3>
                <h1>UPLOADER 🧁</h1>
                <form>
                    <input type="file" />
                    {/* <h2 onClick={()=>runUpdateImgUrl()}></h2> */}
                    <button onClick={this.toggleUploader}>
                        Click to Upload
                    </button>
                    {/* <h2 onClick={() => this.props.updateFavoriteSweet("🍥")}>
                        🔘 Click here to update the favorite sweet for a moment
                    </h2> */}
                </form>
            </div>
        );
    }
}

//rcc
