import { Component, useState } from "react";
import { Link } from "react-router-dom";

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
                    this.setState({ stage: 2 });
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
                        <button disabled={!this.state.email} type="submit">
                            Request New Password
                        </button>
                    </form>
                </div>
            );
        } else if (this.state.stage === 2) {
            return (
                <Stage2
                    email={this.state.email}
                    nextStage={() => this.setState({ stage: 3 })}
                />
            );
        } else if (this.state.stage === 3) {
            return <Stage3 />;
        }
    }
    render() {
        return (
            <>
                <h1>Reset Password</h1>
                {this.renderStage()}
            </>
        );
    }
}

const Stage2 = ({ email, nextStage }) => {
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/password/reset/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                code: code,
                password: password,
            }),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log("response from password/reset/verify", data);
                nextStage();
            });
    };

    return (
        <div>
            <h4>Password Requested!</h4>
            <form onSubmit={handleSubmit}>
                <p>Please enter the code you received</p>
                <input
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    name="code"
                />
                <p>Please enter a new password</p>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name="password"
                />
                <br />
                <br />
                <button type="submit">Change password</button>
            </form>
        </div>
    );
};

const Stage3 = () => {
    return (
        <div>
            <h4>Success!</h4>
            <p>
                You can now <Link to="/login">log in</Link> with your new
                password.
            </p>
        </div>
    );
};
