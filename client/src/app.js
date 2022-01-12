import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            userId: {},
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.logNameAndOthers = this.logNameAndOthers.bind(this);
    }
    componentDidMount() {
        console.log("App component mounted🐧");
        fetch(`/user/${this.state.userId}`)
            .then((res) => res.json())
            .then((result) => {
                console.log("🔵", result);
                if (result.success) {
                    this.setState({
                        uploaderIsVisble: true,
                        userId: result.userId,
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

    logNameAndOthers(val) {
        console.log(this.state.name + val);
    }
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
                        imageUrl="imposter.jpeg"
                        loggerFunc={this.logNameAndOthers}
                    />
                </section>
                {this.state.uploaderIsVisible && <Uploader />}
                <button onClick={this.toggleUploader}>Click to Upload</button>
            </>
        );
    }
}
