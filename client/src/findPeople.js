import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FindPeople = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    function getUsers(search) {
        fetch("/listUsers" + (search ? `/${search}` : ""))
            .then((res) => res.json())
            .then((res) => {
                console.log("res:", res.data);
                setUsers(res.data);
            });
    }

    useEffect(() => {
        getUsers(search);
        return () => {};
    }, [search]);

    return (
        <div>
            <h2>Find Penguins</h2>
            {!search && (
                <div>
                    <h3>Check out who just joined 🐧</h3>
                    {users.map((user) => {
                        return (
                            <div className="card pingui" key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        className="profilepic"
                                        src={
                                            user.profile_pic_url ||
                                            "/default.png"
                                        }
                                    />
                                    {user.first} {user.last}
                                </Link>
                            </div>
                        );
                    })}
                    <h3>Are you looking for someone in particular?</h3>
                </div>
            )}
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
            {search && (
                <div>
                    {users.map((user) => {
                        return (
                            <div className="card" key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        className="profilepic"
                                        src={
                                            user.profile_pic_url ||
                                            "/default.png"
                                        }
                                    />
                                    {user.first} {user.last}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FindPeople;
