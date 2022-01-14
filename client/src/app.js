import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            first: null,
            last: null,
            profilePicUrl: null,
            // favoriteSweet: "🍦",
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.logNameAndOthers = this.logNameAndOthers.bind(this);
        this.updateImgUrl = this.updateImgUrl.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
    }
    componentDidMount() {
        console.log("App component mounted🐧");
        fetch(`/user`)
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    this.setState({
                        first: result.first,
                        last: result.last,
                        profilePicUrl: result.profilePicUrl,
                    });
                } else {
                    this.setState({ error: true });
                }
            })
            .catch((error) => {
                console.log("err in fetch 🔴", error);
                this.setState({ err: true });
            });
        //     //Make fetch request to get data for currently logged in user and store this data in the component state
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisble,
        });
        console.log("user wants to upload😀", this.state);
        // we now want to send over our user's data to the server
    }
    closeUploader() {
        this.setState({
            uploaderIsVisible: false,
        });
    }
    logNameAndOthers(val) {
        console.log(this.state.name + val);
    }

    updateImgUrl() {}

    render() {
        return (
            <>
                <section
                    className="networkLogo"
                    // style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <img
                        src="emperor.jpeg"
                        alt="social network logo"
                        id="homepage-logo"
                    />
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.profilePicUrl}
                        loggerFunc={this.logNameAndOthers}
                        onClick={this.toggleUploader}
                    />
                </section>
                {this.state.uploaderIsVisible && (
                    <Uploader
                        closeUploader={this.closeUploader}
                        updateImgUrl={this.updateImgUrl}
                        toggleUploader={this.toggleUploader}
                        // favoriteSweet={this.state.favoriteSweet}
                        // updateFavoriteSweet={this.updateFavoriteSweet}
                    />
                )}
            </>
        );
    }
}
