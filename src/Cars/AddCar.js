import axios from "axios";
import React, { useState } from "react";
import {Link,useNavigate } from "react-router-dom";

export default function AddCar() {
    let navigate = useNavigate();

    const [car, setCar] = useState({
        name: "",
        model: "",
        year: "",
        owner: {
            f_name: "",
            l_name: "",
            address: "",
        }
    });
    const { name, model, year, f_name, l_name, address } = car;

    const onInputChange = (e) => {
        // If the input field name starts with "owner."
        if (e.target.name.startsWith("owner.")) {
            // Extract the nested property key
            const ownerKey = e.target.name.split(".")[1];

            // Update the state with the nested property
            setCar((prevCar) => ({
                ...prevCar,
                owner: {
                    ...prevCar.owner,
                    [ownerKey]: e.target.value,
                },
            }));
        } else {
            // If it's a non-nested property, update the state directly
            setCar((prevCar) => ({
                ...prevCar,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(car);
        await axios.post("http://localhost:8080/cars/addCar", car);
        navigate("/");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Car</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Car Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter Car name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="model" className="form-label">
                                Model
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter Car model"
                                name="model"
                                value={model}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="year" className="form-label">
                                First Year
                            </label>
                            <input
                                type={"number"}
                                className="form-control"
                                placeholder="Enter car first year"
                                name="year"
                                value={year}
                                onChange={(e) => onInputChange(e)}
                                min={1920}
                                max={new Date().getFullYear()}
                                required
                            />
                        </div>
                        <h3 className="text-center m-4">Owner</h3>
                        <div className="mb-3">
                            <label htmlFor="f_name" className="form-label">
                                First Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter owner first name"
                                name="owner.f_name"
                                value={f_name}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="l_name" className="form-label">
                                Last Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter owner lastname"
                                name="owner.l_name"
                                value={l_name}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                address
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter owner address"
                                name="owner.address"
                                value={address}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary" >
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
