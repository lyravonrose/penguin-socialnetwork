//registration form
import { Component } from "react";
import { Link } from "react-router-dom";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("login just mounted");
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
        console.log("user wants to login", this.state);
        // we now want to send over our user's data to the server
        fetch("/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log("response data from /login.json", data);

                if (data.success) {
                    location.reload();
                } else {
                    this.setState({
                        error: true,
                    });

                    //depending on whether or not we receive a successful server response
                    //we want to render an error state
                    //location reload
                }
            })
            .catch((err) => {
                console.log("err in fetch/login.json 🔴", err);
                this.setState({ error: true });
                <h2 style={{ color: "red" }}>
                    Something went wrong. Please try again!
                </h2>;
            });
    }
    render() {
        return (
            <>
                <h1 className="reg">Login</h1>;
                {this.state.error && (
                    <h2 style={{ color: "red" }}>{this.state.error}</h2>
                )}
                <form>
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
                    <button onClick={this.handleSubmit}>Login</button>
                </form>
                <Link to="/">Click here to register :D</Link>
            </>
        );
    }
}
