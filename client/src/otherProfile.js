import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import FriendButton from "./friendButton";

const OtherProfile = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const history = useHistory();

    function getUser() {
        fetch(`/api/user/${id}`)
            .then((res) => res.json())
            .then((res) => {
                console.log("res:", res.data);
                if (res.redirect) {
                    history.replace("/");
                }
                setUser(res.data);
            });
    }
    useEffect(() => {
        getUser(id);
        return () => {};
    }, [id]);
    return (
        <>
            {user && (
                <div>
                    <h2>
                        {user.first} {user.last}
                    </h2>
                    <p>{user.bio}</p>
                    <img
                        className="profilepic"
                        src={user.profile_pic_url || "/default.png"}
                    />
                    <br></br>
                    <FriendButton id={id} />
                </div>
            )}
        </>
    );
};
export default OtherProfile;
