const axios = require('axios');
const qs = require('qs');
const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3R1c2VyIiwidXNlcklkIjoyLCJpYXQiOjE2MTU2MjMzODUsImV4cCI6MTYxNTg4MjU4NX0.p9Xzr4cByUq9PwoyycG_WklJRAOI5NM0HEM_Sf3_nhQ';

// Fetch vehicle makes
const fetchVehicleMakes = async () => {
  try {
    const query = {
      page: 1,
      perPage: 5,
      sort: {
        name: 1,
    
      },
      filter: {
        name: 'ac',
      },
    };
    const response = await axios.get(
      `http://localhost:8081/vehiclemake?${qs.stringify(query)}`,
      {
        headers: {
          Authorization: `Authorization ${accessToken}`,
        },
      }
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

fetchVehicleMakes();

//fetch body types
const fetchBodyTypes = async () => {
    try {
      const query = {
        page: 1,
        perPage: 5,
        sort: {
          name: 1,
      
        },
        filter: {
          name: 'a',
        },
      };
      const response = await axios.get(
        `http://localhost:8081/bodytype?${qs.stringify(query)}`,
        {
          headers: {
            Authorization: `Authorization ${accessToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  fetchBodyTypes();

  //fetch users
  const Users = async () => {
    try {
      const query = {
        page: 1,
        perPage: 5,
        sort: {
          name: 1,
      
        },
        filter: {
          name: 'ae',
        },
      };
      const response = await axios.get(
        `http://localhost:8081/users?${qs.stringify(query)}`,
        {
          headers: {
            Authorization: `Authorization ${accessToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  fetchUsers();

  //fetch vehicles
  const Vehicles = async () => {
    try {
      const query = {
        page: 1,
        perPage: 5,
        sort: {
          name: 1,
      
        },
        filter: {
          name: 'es',
        },
      };
      const response = await axios.get(
        `http://localhost:8081/vehicles?${qs.stringify(query)}`,
        {
          headers: {
            Authorization: `Authorization ${accessToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  fetchVehicles();

  //fetch pictures
  const Pictures = async () => {
    try {
      const query = {
        page: 1,
        perPage: 5,
        sort: {
          name: 1,
      
        },
        filter: {
          name: 'es',
        },
      };
      const response = await axios.get(
        `http://localhost:8081/pictures?${qs.stringify(query)}`,
        {
          headers: {
            Authorization: `Authorization ${accessToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  fetchPictures();

   //fetch vehiclemodels
   const vehiclemodels = async () => {
    try {
      const query = {
        page: 1,
        perPage: 5,
        sort: {
          name: 1,
      
        },
        filter: {
          name: 'es',
        },
      };
      const response = await axios.get(
        `http://localhost:8081/vehiclemodels?${qs.stringify(query)}`,
        {
          headers: {
            Authorization: `Authorization ${accessToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  fetchVehiclemodels();
