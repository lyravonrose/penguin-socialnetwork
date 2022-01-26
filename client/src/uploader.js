import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = { imagefile: "", showText: false };
        this.updateImgFile = this.updateImgFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }
    updateImgFile(e) {
        console.log(e.target.files);
        this.setState({ imagefile: e.target.files[0], showText: false });
    }
    uploadFile(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append("file", this.state.imagefile);
        this.setState({ showText: true });
        fetch("/upload", {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("result: ", result);
                location.reload();
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
                    <button>Click to Upload</button>
                    {this.state.imagefile && !this.state.showText && (
                        <p>photo ready to be uploaded!</p>
                    )}
                    {this.state.showText && <p>photo is being uploaded!</p>}
                </form>
            </div>
        );
    }
}

//rcc
