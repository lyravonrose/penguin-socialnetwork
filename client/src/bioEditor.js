import React from "react";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: this.props.bio || "",
        };
        this.submitBio = this.submitBio.bind(this);
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
                this.props.onSubmit();
            })
            .catch((err) => {
                console.log("error: ", err);
            });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submitBio}>
                    <textarea
                        onChange={(e) => this.setState({ bio: e.target.value })}
                        value={this.state.bio}
                    />

                    <button type="submit">Add Bio</button>
                </form>
            </div>
        );
    }
}
