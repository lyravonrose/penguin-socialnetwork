import React from "react";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editBioMode: false,
            bio: null,
        };
        this.toggleEditBioMode = this.toggleEditBioMode.bind(this);
        this.uploadBio = this.uploadBio.bind(this);
        this.submitBio = this.submitBio.bind(this);
    }
    componentDidMount() {}

    toggleEditBioMode() {
        this.setState({ editBioMode: !this.state.editBioMode });
    }
    uploadBio(e) {
        console.log(e);
        this.setState({ bio: e.target.values[0] });
    }
    submitBio(e) {
        e.preventDefault();
        fetch("/submitBio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
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
            <>
                <textarea defaultValue={!this.props.editBioMode}></textarea>
                {!this.state.editBioMode && <button>Add Bio</button>}
            </>
        );
    }
}
