import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  let history = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      //   history.push("/dashboard");
      history("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <section className='hero has-background-grey-light is-fullheight is-fullwidth'>
      <div className='hero-body'>
        <div className='container'>
          <div className='columns is-centered'>
            <div className='column is-4-desktop'>
              <form onSubmit={Auth} className='box'>
                <p className='has-text-centered'>{msg}</p>
                <div className='field mt-5'>
                  <label className='label'>Email or Username</label>
                  <div className='controls'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Username'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className='field mt-5'>
                  <label className='label'>Password</label>
                  <div className='controls'>
                    <input
                      type='password'
                      className='input'
                      placeholder='******'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className='field mt-5'>
                  <button className='button is-success is-fullwidth'>Login</button>
                </div>
                <div className='.has-text-centered'>
                  dont have account? <Link to={`/register`}>Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
