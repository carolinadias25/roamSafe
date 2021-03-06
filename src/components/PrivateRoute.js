/* eslint-disable */

import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import firebase from "firebase";

const PrivateRoute = ({ children, ...rest }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(() => {
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  if (loading) {
    return <p className="loading">Loading</p>;
  }
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn }) => {
        if (isSignedIn) {
          return <Route {...rest}>{children}</Route>;
        }
        return <Redirect to="/roamSafe/" />;
      }}
    </FirebaseAuthConsumer>
  );
};

export default PrivateRoute;
