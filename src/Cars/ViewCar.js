import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ViewCar() {
  let navigate = useNavigate();
  const [car, setCar] = useState({
    name: "",
    model: "",
    year: "",
    owner: {
        f_name: "",
        l_name: "",
        address: "",
    },
    });

  const { id } = useParams();

  useEffect(() => {
    const loadCar = async () => {
      const result = await axios.get(`http://localhost:8080/cars/${id}`);
      console.log(result.data);
      setCar(result.data);
    };
    loadCar();
  }, [id]);

//   const loadCar = async () => {
//     const result = await axios.get(
//       `http://localhost:8080/cars/${id}`
//     );
//     setCar(result.data);
//   };

  const deleteCar = async (id) => {
    await axios.delete(`http://localhost:8080/cars/${id}`);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Car {car.carId} Details</h2>

          <div className="card">
            <div className="card-header">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>name: </b>
                  {car.name}
                </li>
                <li className="list-group-item">
                  <b>model: </b>
                  {car.model}
                </li>
                <li className="list-group-item">
                  <b>first Year: </b>
                  {car.year}
                </li>

                <li className="list-group-item">
                  <b>Owner: </b>
                  {car.owner.f_name}, {car.owner.l_name}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={`/editCar/${car.carId}`}>
            Edit Car
          </Link>
          <button
            className="btn btn-danger mx-2"
            onClick={() => deleteCar(car.carId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
