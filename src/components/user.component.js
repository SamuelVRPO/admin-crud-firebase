import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class User extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePoints = this.onChangePoints.bind(this);
        this.onChangeScore = this.onChangeScore.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            currentUser: {
                id: null,
                name: "",
                points: 0,
                score: 0,
                type: "",
            },
            message: "",
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { user } = nextProps;
        if (prevState.currentUser.id !== user.id) {
            return {
                currentUser: user,
                message: ""
            };
        }

        return prevState.currentUser;
    }

    componentDidMount() {
        this.setState({
            currentUser: this.props.user,
        });
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    name: name,
                },
            };
        });
    }

    onChangePoints(e) {
        const points = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    points: points,
                },
            };
        });
    }

    onChangeScore(e) {
        const score = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    score: score,
                },
            };
        });
    }

    onChangeType(e) {
        const type = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    type: type,
                },
            };
        });
    }

    // Skipped updatePublished function

    updateUser() {
        const data = {
            name: this.state.currentUser.name,
            points: this.state.currentUser.points,
            score: this.state.currentUser.score,
            type: this.state.currentUser.type,
        };

        UserDataService.update(this.state.currentUser.id, data)
            .then(() => {
                this.setState({
                    message: "El usuario se actualizó exitosamente!",
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    deleteUser() {
        UserDataService.delete(this.state.currentUser.id)
            .then(() => {
                this.props.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div>
                <h4>User</h4>
                {currentUser ? (
                    <div className="edit-form">
                        <form>
                        <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentUser.name}
                                    onChange={this.onChangeName}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="points">Donation Points</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="points"
                                    value={currentUser.points}
                                    onChange={this.onChangePoints}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="score">Max Game Score</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="score"
                                    value={currentUser.score}
                                    onChange={this.onChangeScore}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="type">Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="type"
                                    value={currentUser.type}
                                    onChange={this.onChangeType}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteUser}
                        >
                            Delete
                        </button>

                        <button 
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateUser}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Haga click en un Usuario...</p>
                    </div>
                )}
            </div>
        );
    }
}