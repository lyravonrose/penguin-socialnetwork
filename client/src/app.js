import { Component, useEffect } from "react";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Profile from "./profile";
import FindPeople from "./findPeople";
import OtherProfile from "./otherProfile";
import FriendsAndWannabees from "./friendsAndWannabes";
import Chat from "./chat";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: null,
            uploaderIsVisible: false,
            first: null,
            last: null,
            profilePicUrl: null,
            bio: null,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.logNameAndOthers = this.logNameAndOthers.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
    }
    componentDidMount() {
        console.log("App component mounted🐧");
        fetch(`/user`)
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    this.setState({
                        id: result.id,
                        first: result.first,
                        last: result.last,
                        profilePicUrl: result.profilePicUrl,
                        bio: result.bio,
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

    render() {
        return (
            <>
                <BrowserRouter>
                    <section
                        className="networkLogo"
                        // style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Link to="/">
                            <img
                                src="/pengo.jpeg"
                                alt="social network logo"
                                id="homepage-logo"
                            />
                        </Link>
                        <div className="nav-top">
                            <div className="navigation">
                                <Link to="/users">Find penguins</Link>
                            </div>
                            <div className="listOfFriends">
                                <Link to="/friends">List of Friends</Link>
                            </div>
                            <div className="chat">
                                <Link to="/chat">Chat</Link>
                            </div>
                        </div>
                        <div className="left-section">
                            <ProfilePic
                                thumbnail
                                first={this.state.first}
                                last={this.state.last}
                                imageUrl={this.state.profilePicUrl}
                                onClick={this.toggleUploader}
                            />
                            <br></br>
                            <a className="logout" href="/logout">
                                <button>Log Out</button>
                            </a>
                        </div>
                    </section>
                    <hr />
                    <Route exact path="/">
                        <section>
                            {this.state.id && (
                                <Profile
                                    id={this.state.id}
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageUrl={this.state.profilePicUrl}
                                    toggleUploader={this.toggleUploader}
                                    bio={this.state.bio}
                                    submitBio={this.submitBio}
                                />
                            )}
                        </section>
                    </Route>
                    <Route path="/users" component={FindPeople} />
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            closeUploader={this.closeUploader}
                            toggleUploader={this.toggleUploader}
                        />
                    )}
                    <Route path="/user/:id" component={OtherProfile} />
                    <Route path="/friends" component={FriendsAndWannabees} />
                    <Route path="/chat">
                        <Chat />
                    </Route>
                    <Route path="*">
                        <Redirect />
                    </Route>
                </BrowserRouter>
            </>
        );
    }
}

const Redirect = () => {
    const history = useHistory();
    useEffect(() => {
        history.push("/");
    }, []);
    return null;
};
