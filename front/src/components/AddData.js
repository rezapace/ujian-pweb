import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddData() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Pria");
  const navigate = useNavigate();

  const addData = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/datas", {
        name,
        email,
        gender,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='columns mt-5 is-centered'>
      <div className='column is-half'>
        <form onSubmit={addData}>
          <div className='field'>
            <label className='label'>Name</label>
            <div className='control'>
              <input
                type='text'
                className='input'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Email</label>
            <div className='control'>
              <input
                type='text'
                className='input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Gender</label>
            <div className='control'>
              <div className='select is-fullwidth'>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value='Pria'>Pria</option>
                  <option value='Wanita'>Wanita</option>
                </select>
              </div>
            </div>
          </div>
          <div className='field'>
            <button type='submit' onClick={() => console.log("tambah")} className='button is-success'>
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
