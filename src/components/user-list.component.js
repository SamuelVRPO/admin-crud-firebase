import React, { Component } from "react";
import UserDataService from "../services/user.service";

import User from "./user.component";

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);
        this.onDataChange = this.onDataChange.bind(this);

        this.state = {
            users: [],
            currentUser: null,
            currentIndex: -1,
        };

        this.unsubscribe = undefined;
    }

    componentDidMount() {
        this.unsubscribe = UserDataService.getAll().orderBy("name", "asc").onSnapshot(this.onDataChange);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onDataChange(items) {
        let users = [];

        items.forEach((item) => {
            let id = item.id;
            let data = item.data();
            users.push({
                id: id,
                name: data.name,
                points: data.points,
                score: data.score,
                type: data.type,
            });
        });

        this.setState({
            users: users,
        });
    }

    refreshList() {
        this.setState({
            currentUser: null,
            currentIndex: -1,
        });
    }

    setActiveUser(user, index) {
        this.setState({
            currentUser: user,
            currentIndex: index,
        });
    }

    render() {
        const { users, currentUser, currentIndex} = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>User List</h4>

                    <ul className="list-group">
                        {users &&
                            users.map((user, index) => (
                                <li
                                    className={ "list-group-item " + (index === currentIndex ? "active" : "")}
                                    key={index}
                                >
                                    {user.name}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentUser ? (
                        <User
                            user={currentUser}
                            refreshList={this.refreshList}
                        />
                    ) : (
                        <div>
                            <br />
                            <p>Has click en un Usuario...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}