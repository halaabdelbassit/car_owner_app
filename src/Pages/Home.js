import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {

  const [cars, setCars] = useState([]);
  useEffect(() => {
    loadCars();
  }, []);
  async function loadCars() {
    const result = await axios.get("http://localhost:8080/cars/getAll");
    setCars(result.data);
  };

  const deleteCar = async (id) => {
    const cars = await axios.delete(`http://localhost:8080/cars/${id}`);
    setCars(cars.data)
    // navigate("/");
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">N°</th>
              <th scope="col">Name</th>
              <th scope="col">Model</th>
              <th scope="col">Year</th>
              <th scope="col">Owner</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{car.name}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>
                  {car.owner.f_name} {car.owner.l_name}
                </td>
                <td>{car.owner.address}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewCar/${car.carId}`}
                  >
                    {" "}
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editCar/${car.carId}`}
                  >
                    {" "}
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteCar(car.carId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
