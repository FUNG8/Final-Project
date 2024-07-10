import { useState } from "react";
import BottomNavbar from "../../components/patients/BottomNavbar";
import PatientBanner from "../../components/patients/PatientBanner";
import MessageBoard from "../../components/patients/PatientMessageBoard";
import { Container } from "@mui/material";
import "./Notification.scss"

export default function Notification() {
  
  return (
    <div className="app">
      <PatientBanner />
      <Container className="message-container">
      <MessageBoard />
      </Container>
      <BottomNavbar />
    </div>
       
     );
  }