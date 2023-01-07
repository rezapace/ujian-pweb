import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [datas, setDatas] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    refreshToken();
    getDatas();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        // history.push("/");
        history("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getDatas = async () => {
    const response = await axiosJWT.get("http://localhost:5000/datas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDatas(response.data);
  };

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      // history.push("/");
      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/datas/${id}`);
      getDatas();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container mt-5'>
      <h1>Welcome Back: {name}</h1>
      <div className='is-flex is-justify-content-space-between'>
        {/* <button onClick={getDatas} className='button is-info'>
          Get Users
        </button> */}
        <Link to={`/add`} className='button is-info'>
          Add Data
        </Link>
        <button onClick={Logout} className='button is-danger'>
          logout
        </button>
      </div>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.gender}</td>
              <td>
                <Link to={`/edit/${data.id}`} className='button is-success'>
                  Edit
                </Link>
                <button onClick={() => deleteData(data.id)} className='button is-danger'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
