import React from "react";

export default class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hover: false };
    }

    render() {
        let { first, last, imageUrl, onClick, thumbnail } = this.props;
        imageUrl = imageUrl || "default.png";
        return (
            <>
                <div className="pic-container">
                    <h1>
                        {first} {last}
                    </h1>
                    <img
                        onMouseOver={() => {
                            this.setState({ hover: true });
                        }}
                        onMouseOut={() => {
                            this.setState({ hover: false });
                        }}
                        className={`profilepic ${thumbnail ? "thumbnail" : ""}`}
                        onClick={() => {
                            onClick();
                        }}
                        src={imageUrl}
                        alt={`${first} ${last}`}
                    />
                    {this.state.hover && <p>upload a photo!</p>}
                </div>
            </>
        );
    }
}

//_rfc shortcut
