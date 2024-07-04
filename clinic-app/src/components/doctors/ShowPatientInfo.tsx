import {
  Paper,
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  Autocomplete,
} from "@mui/material";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useEditPatientInfo, useShowPatientInfo } from "../../api/patientAPI";
import { useParams, useSearchParams } from "react-router-dom";
import React from "react";
import { MuiTelInput } from "mui-tel-input";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: 8,
  textAlign: "center",
  justifyContent: "flex-start",
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

const CustonTextField = styled(TextField)(({ theme }) => ({}));

interface Patient {
  id: string;
  gender: string;
  firstName: string;
  lastName: string;
  hkid: string;
  birth_date: string;
  blood: string;
  phone_number: string;
  emergency_name: string;
  emergency_contact: string;
}

export function ShowPatientInfo() {
  let { patientId } = useParams();

  console.log("param is", patientId);

  let [isEditing, setIsEditing] = useState(false);
  let [editedPatient, setEditedPatient] = useState<Patient | null>(null);

  const patients = useShowPatientInfo(parseInt(patientId!));
  const editPatientsDetails = useEditPatientInfo(parseInt(patientId!));
  const patient = (editPatientsDetails as any)?.result?.[0];

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedPatient(patient);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    if (editedPatient) {
      // Check the difference between the original patient and the edited patient
      const hasChanges =
        JSON.stringify(patient) !== JSON.stringify(editedPatient);

      if (hasChanges) {
        // Perform the save logic using post fetch to update the database
        fetch(`/patients/editPatients?patientId=${patientId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedPatient),
        })
          .then((response) => {
            if (response.ok) {
              // Once the save is successful, you can set isEditing back to false
              setIsEditing(false);
            } else {
              // Handle error case if save fails
              console.log("Save failed");
            }
          })
          .catch((error) => {
            // Handle error case if fetch fails
            console.log("Error:", error);
          });
      } else {
        // No changes, do nothing
        setIsEditing(false);
      }
    }
  };

  // Function to handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const updatedPatient = { ...editedPatient };
    updatedPatient.id = target.value;
    setEditedPatient(updatedPatient as SetStateAction<Patient | null>);
  };

  //set input usestate
  const genderOptions = ["male", "female"];
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [gender, setGender] = React.useState<string | null>(genderOptions[0]);
  const [phoneNumberInput, setPhoneNumberInput] = React.useState("");
  const phoneChange = (newPhoneNumberInput: React.SetStateAction<string>) => {
    setPhoneNumberInput(newPhoneNumberInput);
  };
  const [emergencyNameInput, setEmergencyNameInput] = useState("");
  const [emergencyContactInput, setEmergencyContactInput] = React.useState("");
  const emergencyContactChange = (
    newEmergencyContactInput: React.SetStateAction<string>
  ) => {
    setEmergencyContactInput(newEmergencyContactInput);
  };

  return (patients as any)?.result?.map((patient: any) => (
    <div>
     
      {isEditing ? (
            <Item>
            <Container maxWidth="lg">
              <Grid p={4}>
                <Typography variant="h4">
                  {patient.firstName} {patient.lastName}
                </Typography>
                <p>Patient Details</p>
              </Grid>
              <Grid
                container
                rowSpacing={0}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {/* 1 row */}
                <Grid
                  height={80}
                  xs={6}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    <b>ID:</b>
                  </Grid>
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    {patient.id}
                  </Grid>
                </Grid>
    
                <Grid
                  height={80}
                  xs={6}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    <b>HKID:</b>
                  </Grid>
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    {patient.hkid}
                  </Grid>
                </Grid>
    
                {/* 2　row */}
                <Grid
                  height={80}
                  xs={6}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    <b>First Name:</b>
                  </Grid>
                  <TextField
                    value={firstNameInput}
                    sx={{ width: 300, mt: 1 }}
                    onChange={(e) => setFirstNameInput(e.target.value)}
                    margin="normal"
                    required
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                  />
                </Grid>
    
                <Grid
                  height={80}
                  xs={6}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    <b>Last Name:</b>
                  </Grid>
                  <TextField
                          value={lastNameInput}
                          sx={{ width: 300, mt: 1 }}
    
                          onChange={(e) => setLastNameInput(e.target.value)}
                          margin="normal"
                          required
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="lastName"
                          autoFocus
                        />
                </Grid>
                {/* 3　row */}
                <Grid
                  height={80}
                  xs={6}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    <b>Birth Date:</b>
                  </Grid>
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    {patient.birth_date}
                  </Grid>
                </Grid>
    
                <Grid
                  height={80}
                  xs={6}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    <b>Gender:</b>
                  </Grid>
                  <Autocomplete
                            value={gender}
                            onChange={(event: any, newGender: string | null) => {
                              setGender(newGender);
                            }}
                            inputValue={genderInput}
                            onInputChange={(event, newInputValue) => {
                              setGenderInput(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={genderOptions}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                              <TextField {...params} label="Gender" />
                            )}
                          />
                </Grid>
                {/* 4　row */}
                <Grid
                  height={80}
                  xs={6}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    <b>Blood Type:</b>
                  </Grid>
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    {patient.blood}
                  </Grid>
                </Grid>
    
                <Grid
                  height={80}
                  xs={6}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    <b>Phone Number:</b>
                  </Grid>
                  <MuiTelInput
                            sx={{ width: 300, mt: 1, mb: 0 }}
                            label="Phone Number"
                            value={phoneNumberInput}
                            onChange={phoneChange}
                          />
                </Grid>
                {/* 5　row */}
                <Grid
                  height={80}
                  xs={6}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    <b>Emergency Contact Person:</b>
                  </Grid>
                  <TextField
                            sx={{ width: 300, mt: 1 }}
                            value={emergencyNameInput}
                            onChange={(e) => setEmergencyNameInput(e.target.value)}
                            margin="normal"
                            required
                            id="emergencyNameInput"
                            label="Emergency Contact Person"
                            name="emergencyNameInput"
                            autoComplete="emergencyNameInput"
                            autoFocus
                          />
                </Grid>
    
                <Grid
                  height={80}
                  xs={6}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    <b>Emergency Person Phone Number:</b>
                  </Grid>
                  <MuiTelInput
                            sx={{ width: 300, mt: 1, mb: 0 }}
                            label="Emergency Contact Person Number"
                            value={emergencyContactInput}
                            onChange={emergencyContactChange}
                          />
                </Grid>
                {/* 6　row */}
                <Grid
                  height={80}
                  xs={6}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    <b>Created At:</b>
                  </Grid>
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    {patient.created_at}
                  </Grid>
                </Grid>
    
                <Grid
                  height={80}
                  xs={6}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    <b>Updated At:</b>
                  </Grid>
                  <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                    {patient.updated_at}
                  </Grid>
                </Grid>
              </Grid>
            </Container>
    
            {/* Buttons */}
            <Grid p={4}>
              <Stack
                spacing={{ sm: 4, md: 8 }}
                direction="row"
                justifyContent={"center"}
              >
                
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={handleSaveClick}
                  >
                    SAVE
                  </Button>
                
                <Button variant="contained" disableElevation>
                  HISTORY
                </Button>
              </Stack>
            </Grid>
    
            {/* </Stack> */}
          </Item>
            ) : (
              <Item>
              <Container maxWidth="lg">
                <Grid p={4}>
                  <Typography variant="h4">
                    {patient.firstName} {patient.lastName}
                  </Typography>
                  <p>Patient Details</p>
                </Grid>
                <Grid
                  container
                  rowSpacing={0}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  {/* 1 row */}
                  <Grid
                    height={80}
                    xs={6}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                  >
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      <b>ID:</b>
                    </Grid>
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      {patient.id}
                    </Grid>
                  </Grid>
      
                  <Grid
                    height={80}
                    xs={6}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                  >
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      <b>HKID:</b>
                    </Grid>
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      {patient.hkid}
                    </Grid>
                  </Grid>
      
                  {/* 2　row */}
                  <Grid
                    height={80}
                    xs={6}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                  >
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      <b>First Name:</b>
                    </Grid>
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      {patient.firstName}
                    </Grid>
                  </Grid>
      
                  <Grid
                    height={80}
                    xs={6}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                  >
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      <b>Last Name:</b>
                    </Grid>
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      {patient.lastName}
                    </Grid>
                  </Grid>
                  {/* 3　row */}
                  <Grid
                    height={80}
                    xs={6}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                  >
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      <b>Birth Date:</b>
                    </Grid>
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      {patient.birth_date}
                    </Grid>
                  </Grid>
      
                  <Grid
                    height={80}
                    xs={6}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                  >
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      <b>Gender:</b>
                    </Grid>
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      {patient.gender}
                    </Grid>
                  </Grid>
                  {/* 4　row */}
                  <Grid
                    height={80}
                    xs={6}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                  >
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      <b>Blood Type:</b>
                    </Grid>
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      {patient.blood}
                    </Grid>
                  </Grid>
      
                  <Grid
                    height={80}
                    xs={6}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                  >
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      <b>Phone Number:</b>
                    </Grid>
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      {patient.phone_number}
                    </Grid>
                  </Grid>
                  {/* 5　row */}
                  <Grid
                    height={80}
                    xs={6}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                  >
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      <b>Emergency Contact Person:</b>
                    </Grid>
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      {patient.emergency_name}
                    </Grid>
                  </Grid>
      
                  <Grid
                    height={80}
                    xs={6}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                  >
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      <b>Emergency Person Phone Number:</b>
                    </Grid>
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      {patient.emergency_contact}
                    </Grid>
                  </Grid>
                  {/* 6　row */}
                  <Grid
                    height={80}
                    xs={6}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                  >
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      <b>Created At:</b>
                    </Grid>
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      {patient.created_at}
                    </Grid>
                  </Grid>
      
                  <Grid
                    height={80}
                    xs={6}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                  >
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      <b>Updated At:</b>
                    </Grid>
                    <Grid xs={6} p={2} sx={{ textAlign: "left" }}>
                      {patient.updated_at}
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
      
              {/* Buttons */}
              <Grid p={4}>
                <Stack
                  spacing={{ sm: 4, md: 8 }}
                  direction="row"
                  justifyContent={"center"}
                >
                  
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={handleEditClick}
                    >
                      EDIT
                    </Button>
                  
                  <Button variant="contained" disableElevation>
                    HISTORY
                  </Button>
                </Stack>
              </Grid>
      
              {/* </Stack> */}
            </Item>
            )}
      
     
      
    </div>
  ));
}
