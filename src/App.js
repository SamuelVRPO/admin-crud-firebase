import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import AddUser from "./components/add-user.component";
import UserList from "./components/user-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/users" className="navbar-brand">Admins</a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <h2>React Firestore CRUD</h2>
          <Routes>
            <Route exact path="/users" element={UserList} />
            <Route exact path="/add" element={AddUser} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;