import { Component } from "react";
import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: this.props.first,
            last: this.props.last,
            bio: this.props.bio,
            profilePicUrl: this.props.imageUrl,
            toggleUploader: false,
            editBioMode: false,
        };
    }

    fetchBio() {
        fetch("/bio")
            .then((res) => res.json())
            .then(({ bio }) => {
                this.setState({ bio });
            });
    }

    componentDidMount() {
        this.fetchBio();
    }

    render() {
        return (
            <>
                <div className="profile">
                    <ProfilePic
                        className="biggerPic"
                        imageUrl={this.state.profilePicUrl}
                        onClick={this.props.toggleUploader}
                    />
                    <div>
                        <h1>
                            {this.props.first} {this.props.last}
                        </h1>
                        {this.state.editBioMode ? (
                            <BioEditor
                                bio={this.state.bio}
                                onSubmit={() => {
                                    this.setState({ editBioMode: false });
                                    this.fetchBio();
                                }}
                            />
                        ) : (
                            <div>
                                <p>{this.state.bio}</p>
                                <button
                                    onClick={() =>
                                        this.setState({
                                            editBioMode: true,
                                        })
                                    }
                                >
                                    Edit bio
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}
//rcc

// export function Profile() {
//     return (
//         <>
//             <div>
//                 <ProfilePic
//                     className="biggerPic"
//                     imageUrl={this.state.profilePicUrl}
//                     loggerFunc={this.logNameAndOthers}
//                     onClick={this.toggleUploader}
//                 />
//                 <BioEditor />
//             </div>
//         </>
//     );
// }
