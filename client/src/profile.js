// The existing ProfilePic component, which will show the user's pic in a larger size.

// A new BioEditor component, which will show the user's bio if they have one and allow them to add one if they don't. Also, if the user does already have a bio, the BioEditor component will allow them to edit it.

// It is not necessary to create a component to show the user's name. The Profile component can just print the name out in its render function.

import { Component } from "react";
import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: null,
            last: null,
            bio: null,
            profilePicUrl: null,
            toggleUploader: false,
        };
    }

    render() {
        return (
            <>
                <div>
                    <ProfilePic
                        className="biggerPic"
                        imageUrl={this.state.profilePicUrl}
                        loggerFunc={this.logNameAndOthers}
                        onClick={this.toggleUploader}
                    />
                    <BioEditor />
                </div>
            </>
        );
    }
}
//rcc
