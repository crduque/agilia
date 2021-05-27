import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  useEffect(()=>{
    fetch("https://reqres.in/api/users", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				setUsers(responseJson.data);
			})
			.catch(error => {
				setError(error);
			});
	}, []);

  let usersName = users.map((user, index) => {
    return (
      <li>{user.first_name}</li>
    )
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {users ? usersName : ""}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
