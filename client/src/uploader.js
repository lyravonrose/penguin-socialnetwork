import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = { imagefile: "" };
        this.updateImgFile = this.updateImgFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }
    updateImgFile(e) {
        console.log(e.target.files);
        this.setState({ imagefile: e.target.files[0] });
    }
    uploadFile(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append("file", this.state.imagefile);
        fetch("/upload", {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("result: ", result);
            })
            .catch((err) => {
                console.log("error: ", err);
            });
    }
    render() {
        return (
            <div className="modal">
                <h3 onClick={() => this.props.closeUploader()}>X</h3>
                <h1>UPLOADER 🐧</h1>
                <form onSubmit={this.uploadFile}>
                    <input onChange={this.updateImgFile} type="file" />
                    {/* <h2 onClick={()=>runUpdateImgUrl()}></h2> */}
                    <button>Click to Upload</button>
                    {/* <h2 onClick={() => this.props.updateFavoriteSweet("🍥")}>
                        🔘 Click here to update the favorite sweet for a moment
                    </h2> */}
                </form>
            </div>
        );
    }
}

//rcc
