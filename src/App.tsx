import React from "react"
import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserData {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
}

const fetchUser = async (): Promise<UserData> => {
  const response = await axios.get('https://randomuser.me/api/');
  const { name, email } = response.data.results[0];
  return { name, email };
};

const saveUserToLocal = (user: UserData) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getUserFromLocal = (): UserData | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const DisplayUserData = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userFromLocal = getUserFromLocal();
    if (userFromLocal) {
      setUser(userFromLocal);
    } else {
      fetchUser().then((data) => {
        setUser(data);
        saveUserToLocal(data);
      });
    }
  }, []);

  const refreshUser = () => {
    fetchUser().then((data) => {
      setUser(data);
      saveUserToLocal(data);
    });
  };

  return (
    <div style={styles.section}>
      <h1>User Information</h1>
      {user ? (
        <>
          <h5>Name: {user.name.title} {user.name.first} {user.name.last}</h5>
          <h5>Email: {user.email}</h5>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
      <button style={styles.refreshButton} onClick={refreshUser}>REFRESH</button>
    </div>
  );
};

export default DisplayUserData;

const styles = {
  section: {
    fontFamily: "-apple-system",
    fontSize: "1rem",
    fontWeight: 1.5,
    lineHeight: 1.5,
    color: "#292b2c",
    backgroundColor: "#fff",
    padding: "0 2em"
  },
  refreshButton:{
   
    fontWeight: 1.5,
    lineHeight: 1.5,
    color: "#292b2c",
    backgroundColor: "#D3D3D3",
    fontfamily:"bold",
    cursor:"pointer"
  
  }
}


