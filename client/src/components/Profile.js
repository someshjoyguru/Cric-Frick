import React, { useState } from "react";
import avatar from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import useFetch from "../hooks/fetch.hook";
import { updateUser } from "../helper/helper";
import { useNavigate } from "react-router-dom";
import MatchDetail from "./MatchDetail";
import Leaderboard from "./Leaderboard";
// import {jsonString} from "./MatchDetail";

import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";


export default function Profile() {
  const [file, setFile] = useState(); //change profile picture 
  // eslint-disable-next-line
  const [matchPredictions, setMatchPredictions] = useState(); //save match predictions
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();
  const [showMatchList, setShowMatchList] = useState(false);
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [jsonString, setJsonString] = useState("");

// eslint-disable-next-line
  const handleExportJsonString = (jsonString) => {
    // Use the jsonString value here as needed
    console.log(jsonString);
    // ...
  };
  // let updateRegisterMatchPredictions = registerMatchPredictions();
  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
      predictions: jsonString || apiData?.predictions ||"",
      points:  apiData?.points || "0",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
        predictions: jsonString || apiData?.predictions || "",
      });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>,
      });
    },
  });

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  // logout handler function
  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

 
  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  const toggleMatchList = () => {
    setShowMatchList(!showMatchList);
  };

  const toggleLeaderBoard = () => {
    setShowLeaderBoard(!showLeaderBoard);
  };

  // {showMatchList && <MatchList onClose={toggleMatchList} />}
  if (!showMatchList && !showLeaderBoard){
  return (
      <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "45%", paddingTop: "2em" }}
          >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-2 text-xl text-center text-gray-500">
              You can update the details.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || file || avatar}
                  className={`${styles.profile_img} ${extend.profile_img}`}
                  alt="avatar"
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-3">
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="FirstName"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="LastName"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Email*"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Address"
              />
              <button className={styles.btn} type="submit">
                Update
              </button>
              <div className="container flex justify-center my-0 gap-10">
                <button className={styles.btnHalf} onClick={toggleMatchList}>
                  Upcoming<br></br> Matches
                </button>
                <button className={styles.btnHalf} onClick={toggleLeaderBoard}>
                  View <br></br>Leaderboard
                </button>
              </div>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                come back later?{" "}
                <button
                  onClick={userLogout}
                  className="text-red-500"
                  to="/landing"
                >
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>

    </div>
    );
  }else if (showMatchList){
    return (
      <div className="leader-board">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-screen">
            <div
              className={`${styles.glass} ${extend.glass}`}
              style={{ width: "45%", paddingTop: "2em" }}
            >
              
              <div className="title flex flex-col items-center">
              <h4 className="text-5xl py-5 font-bold">Match Details</h4>
              <div className="overflow-y-auto h-85 " style={{ maxHeight: "600px", overflowY: "scroll", paddingBottom: "1.5rem" }}>
              <MatchDetail exportJsonString={setJsonString} />
                  </div>

                <button style={{
                  marginTop: "20px", marginBottom: "20px",
                }}className={styles.btn} onClick={() => {toggleMatchList()}}>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
  }
  else if (showLeaderBoard){
    return (
      <div className="leader-board">
       <div className="container mx-auto">
          <div className="flex justify-center items-center h-screen">
            <div
              className={`${styles.glass} ${extend.glass}`}
              style={{ width: "45%", paddingTop: "2em" }}
            >
              
              <div className="title flex flex-col items-center">
              <h4 className="text-5xl py-5 font-bold">Match Details</h4>
                <div style={{ maxHeight: "600px", overflowY: "scroll", paddingBottom:"1.5 rem" }}>
                  <Leaderboard />
                </div>
                <button className={styles.btn} onClick={() => toggleLeaderBoard()}>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
