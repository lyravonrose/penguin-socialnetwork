import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

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
                    <img src={user.profile_pic_url} />
                </div>
            )}
        </>
    );
};
export default OtherProfile;
