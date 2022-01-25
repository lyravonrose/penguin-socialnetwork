import { Component } from "react";

export class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }
    componentDidMount() {
        console.log("Logo mounted");
    }
    render() {
        return (
            <>
                <img src="default.png"></img>
                {this.state.error && (
                    <h2 style={{ color: "red" }}>{this.state.error}</h2>
                )}
            </>
        );
    }
}
