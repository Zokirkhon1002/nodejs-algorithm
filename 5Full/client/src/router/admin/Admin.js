import React from "react";

const Admin = () => {

  
  const handleSubmit = (e)=> {
    e.preventDefault();

  }

  return (
    <div>
      <h1>Admin</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='username' />
        <input type='password' placeholder='password' />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default Admin;
