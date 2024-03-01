import { useState, useEffect } from 'react'


import './App.css'
import { Button, Card, } from 'react-bootstrap'
import axios from 'axios'


function App() {
  const [allUsers, setAllUsers] = useState([])
  const [userData, setUserData] = useState("")
  const [color, setColor] = useState("lightred")

  const getUserDetails = async () => {
    const result = await axios.get("https://dummyjson.com/users")

    setAllUsers(result.data.users)
    setUserData(getRandomUser(result.data.users))
    console.log(userData);
    // generateColor()
  }
  const getRandomUser = (userDetails) => {
    const randomUser = userDetails[Math.floor(Math.random() * userDetails.length)]
    return randomUser
  }
  useEffect(() => {

    getUserDetails()
  }, [])

  const handleRefresh = () => {
    setUserData(getRandomUser(allUsers))
    console.log(userData);
    generateColor()
  }

  //random color
  const generateColor = () => {
    let randomColorString = "#";
    const arrayOfColorFunctions = "0123456789abcdef";
    for (let x = 0; x < 6; x++) {
      let index = Math.floor(Math.random() * 16);
      let value = arrayOfColorFunctions[index];

      randomColorString += value;
    }
    setColor(randomColorString)
    return randomColorString;
  };

  useEffect(() => {
    document.getElementById("box").style.backgroundColor = color
  }, [color])




  return (
    <>

      <div style={{ width: "100%", height: "100vh" }} className="main d-flex align-items-center flex-column justify-content-center bg-dark">
        <h2 style={{ color: "white" }} className='bg-transperent mb-3'>Random User On Refresh</h2>
        <div id='box' style={{ width: "700px", backgroundColor: "lightblue" }} className=" align-items-center  rounded">
          <div className='row'>
            <div className="col-lg-6 d-flex flex-column align-items-center p-3 mb-2">
              <Card style={{ width: '18rem' }}>
                <Card.Img style={{ height: "150px" }} variant="top" src={userData?.image} />
                <Card.Body style={{ height: "70px", textAlign: "center" }}>
                  <Card.Title>{userData?.firstName} {userData?.lastName}</Card.Title>
                  <Card.Text>
                    {userData?.gender}
                  </Card.Text>

                </Card.Body>
              </Card>
              <div className="mt-1  d-flex justify-content-between p-4">
                <div className='me-5'>
                  <h6>Birth Date</h6>
                  {userData?.birthDate}
                </div>
                <div>
                  <h6>Age</h6>
                  {userData?.age}
                </div>

              </div>
              <div className="mt-1 d-flex justify-content-between p-4">
                <div className='me-5'>
                  <h6>Weight</h6>
                  {userData?.weight}
                </div>
                <div>
                  <h6>Height</h6>
                  {userData?.height}
                </div>

              </div >

              <Button className='mb-2' onClick={handleRefresh} variant="success">Refresh</Button>{' '}

            </div>


            <div className="col-lg-6 mt-3 ">
              <div className="mt-3">
                <h4>HOME ADDRESS</h4>
                {userData?.address?.address}
              </div>
              <div className="mt-3">
                <h4>Mobile Phone</h4>
                {userData?.phone}
              </div>
              <div className="mt-3">
                <h4>Company</h4>
                {userData?.company?.name}
              </div>
              <div className="mt-3">
                <h4>Job Title</h4>
                {userData?.company?.title}
              </div>
              <div className="mt-3">
                <h4>Email</h4>
                {userData?.email}
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default App
