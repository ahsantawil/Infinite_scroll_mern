import React, {useState, useEffect} from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [lastId, setLastId] = useState(0);
    const [tempId, setTempId] = useState(0);
    const [limit, setLimit] = useState(20);
    const [keyword, setKeyword] = useState('');


    useEffect(()=> {
        getUsers();
    }, [lastId, keyword]);

        const getUsers = async () => {
            const response = await axios.get(`http://localhost:5000/users?search_query=${keyword}&lastId=${lastId}&limit=${limit}`);
            const newUsers = response.data.result;
            setUsers([...users, ...newUsers]);
            setTempId(response.data.lastId);
        };


  return (
    <div className="container mt-5">
        <div className="columns">
            <div className="column is-centered">
                <form>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input type="text"  className="input" placeholder="Find Something .. " />
                        </div>
                        <div className="control">
                            <button type="submit" className="button is-info">Search</button>
                        </div>
                    </div>
                </form>
                <table className="table is-striped is-bordered is-fullwidth mt-2">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default UserList;