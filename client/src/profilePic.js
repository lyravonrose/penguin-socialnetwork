export default function ProfilePic({ first, last, imageUrl, loggerFunc }) {
    imageUrl = imageUrl || "default.png";
    const nameSymbols = `!!!&&&***`;
    return (
        <div>
            <h1>
                {first}
                {last}
            </h1>
            <img
                onClick={() => loggerFunc(nameSymbols)}
                src={imageUrl}
                alt={`${first}${last}`}
                id="navbar-avatar"
            />
        </div>
    );
}

//_rfc shortcut
