export default function ProfilePic({
    first,
    last,
    imageUrl,
    loggerFunc,
    onClick,
}) {
    imageUrl = imageUrl || "default.png";
    const nameSymbols = `!!!&&&***`;
    return (
        <div>
            <h1>
                {first}
                {last}
            </h1>
            <img
                onClick={() => {
                    loggerFunc(nameSymbols);
                    onClick();
                }}
                src={imageUrl}
                alt={`${first} ${last}`}
                id="navbar-avatar"
            />
        </div>
    );
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
