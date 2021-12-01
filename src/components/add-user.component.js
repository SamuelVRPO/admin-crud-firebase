// This component has a Form to submit a new User with 
// nickName, donationScore, HighestGameScore, type
import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePoints = this.onChangePoints.bind(this);
        this.onChangeScore = this.onChangeScore.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.newUser = this.newUser.bind(this);

        this.state = {
            name: "",
            points: 0,
            score: 0,
            type: "",

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangePoints(e) {
        this.setState({
            points: e.target.value,
        });
    }

    onChangeScore(e) {
        this.setState({
            score: e.target.value,
        });
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value,
        });
    }

    saveUser() {
        let data = {
            name: this.state.name,
            points: this.state.points,
            score: this.state.score,
            type: this.state.type
        };

        UserDataService.create(data)
            .then(() => {
                console.log("Se ha creado un nuevo item.");
                this.setState({
                    submitted: true,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newUser() {
        this.setState({
            name: "",
            points: 0,
            score: 0,
            type: "",

            submitted: false,
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Se ha entregado exitosamente!</h4>
                        <button className="btn btn-success" onClick={this.newUser}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div> 

                        <div className="form-group">
                            <label htmlFor="Points">Donation Points</label>
                            <input 
                                type="number"
                                className="form-control"
                                id="points"
                                required
                                value={this.state.points}
                                onChange={this.onChangePoints}
                                name="points"
                            />
                        </div> 

                        <div className="form-group">
                            <label htmlFor="Score">Max Game Score</label>
                            <input 
                                type="number"
                                className="form-control"
                                id="score"
                                required
                                value={this.state.score}
                                onChange={this.onChangeScore}
                                name="score"
                            />
                        </div> 

                        <div className="form-group">
                            <label htmlFor="Type">Type</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="type"
                                required
                                value={this.state.type}
                                onChange={this.onChangeType}
                                name="type"
                            />
                        </div> 

                        <button onClick={this.saveUser} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}