import { Component } from "react";

export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            email: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("reset password just mounted");
    }
    handleChange({ target }) {
        console.log("value typed", target.value);
        this.setState({ [target.name]: target.value }, () =>
            console.log("handlechange update done:", this.state)
        );
    }
    handleSubmit(e) {
        e.preventDefault();
        fetch("/password/reset/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: this.state.email }),
        })
            .then((data) => data.json())
            .then(
                (data) => {
                    console.log("response data from /reset.json", data);
                }
                //////////////////
            );
    }
    renderStage() {
        if (this.state.stage === 1) {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        Email:{" "}
                        <input
                            onChange={(e) =>
                                this.setState({ email: e.target.value })
                            }
                            value={this.state.email}
                            type="email"
                        />
                        <br></br>
                        <button type="submit">Request New Password</button>
                    </form>
                </div>
            );
        } else if (this.state.stage === 2) {
            return <div>Stage 2</div>;
        }
    }
    render() {
        return (
            <>
                <h1>Reset Password</h1>
                {this.renderStage()}
                <button onClick={() => this.setState({ stage: 2 })}>
                    Next
                </button>
            </>
        );
    }
}
