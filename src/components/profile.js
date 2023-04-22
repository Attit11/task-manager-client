import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../asset/config";

// const loadData = async () => {
//   const user = await axios.get(`${apiUrl}/user/me`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//     },
//   });
//   console.log(user);
//   return user;
// };

function Profile() {
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get(`${apiUrl}/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((data) => {
        setUser(data.data);
      });
  }, []);
  return (
    <div>
      <Typography variant="h6" component="h2">
        Name: {user?.name}
      </Typography>

      <Typography variant="h6" component="h2">
        Age: {user?.age}
      </Typography>

      <Typography variant="h6" component="h2">
        email: {user?.email}
      </Typography>
    </div>
  );
}

export default Profile;
