//registration form
import { Component } from "react";
import { Link } from "react-router-dom";

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("registration just mounted");
    }
    handleChange({ target }) {
        console.log("input value changed");
        console.log("value typed", target.value);
        // to update state we use this.setState and pass to it an object with our state changes
        this.setState({ [target.name]: target.value }, () =>
            console.log("handlechange update done:", this.state)
        );
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("user wants to submit", JSON.stringify(this.state));
        // we now want to send over our user's data to the server
        fetch("/register.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log("response data from /register.json", data);

                if (data.success) {
                    location.reload();
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err in fetch/register.json 🔴", err);
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <>
                <h1 className="reg">Registration</h1>
                {this.state.error && (
                    <h2 style={{ color: "red" }}>{this.state.error}</h2>
                )}
                <form>
                    <input
                        name="first"
                        placeholder="First Name"
                        type="text"
                        onChange={({ target }) => this.handleChange({ target })}
                    />
                    <input
                        name="last"
                        placeholder="Last Name"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <input
                        name="email"
                        placeholder="your@email.com"
                        type="email"
                        onChange={this.handleChange}
                    />
                    <input
                        name="password"
                        placeholder="password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleSubmit}>Register</button>
                    <br></br>
                    <br></br>
                    <Link className="clickHere" to="/login">
                        Click here to log in
                    </Link>
                </form>
            </>
        );
    }
}
