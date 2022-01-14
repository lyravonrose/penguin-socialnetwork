import React from "react";

export default class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hover: false };
    }

    render() {
        const nameSymbols = `!!!&&&***`;
        let { first, last, imageUrl, loggerFunc, onClick } = this.props;
        imageUrl = imageUrl || "default.png";
        return (
            <>
                <div className="pic-container">
                    <h1>
                        {first}
                        {last}
                    </h1>
                    <img
                        onMouseOver={() => {
                            this.setState({ hover: true });
                        }}
                        onMouseOut={() => {
                            this.setState({ hover: false });
                        }}
                        className="profilepic"
                        onClick={() => {
                            loggerFunc(nameSymbols);
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
//({imageUrl, toggleUploader})

//onClick={toggleUploader}

// export default function ProfilePic(props){
//     console.log("props passed to ProfilePic:", props)
//     return (
//         <>

//         </>
//     )
// }

//props.___ : function component
//this.props.___: class component
