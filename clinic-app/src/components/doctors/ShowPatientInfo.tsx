import {
  Paper,
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { editPatientInfo, useShowPatientInfo } from "../../api/patientAPI";
import { useParams, useSearchParams } from "react-router-dom";
import React from "react";
import { MuiTelInput, MuiTelInputInfo } from "mui-tel-input";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

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

  const queryClient = useQueryClient()
  // console.log("param is", patientId);

  const onEditItem = useMutation({
    mutationFn: async (data: { patientId: number, editedInfo: any }) =>
      editPatientInfo(data.patientId, data.editedInfo),
    onSuccess: (message: any) => {
      console.log(message)
      // invalidate query
      queryClient.invalidateQueries({ queryKey: ["showPatientsInfo"] })
    }
  }
  )

  let [isEditing, setIsEditing] = useState(false);
  let [editedPatient, setEditedPatient] = useState<Patient | null>(null);


  const response = useShowPatientInfo(parseInt(patientId!));

  const handleEditClick = () => {
    setIsEditing(true);
    console.log("check response result", (response as any).result);
    setEditedPatient((response as any).result[0]);
  };



  const handleSaveClick = async () => {
    console.log("edited info", editedPatient)
    onEditItem.mutate({ patientId: parseInt(patientId!), editedInfo: editedPatient })
    setIsEditing(false);
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
  // const [firstNameInput, setFirstNameInput] = useState("");
  // const [lastNameInput, setLastNameInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [gender, setGender] = React.useState<string | null>(genderOptions[0]);
  const [phoneNumberInput, setPhoneNumberInput] = React.useState(editedPatient?.phone_number || "");
  // const [emergencyNameInput, setEmergencyNameInput] = useState("");
  const [emergencyContactInput, setEmergencyContactInput] = React.useState(editedPatient?.emergency_contact || "");
  // const [editedEmergencyContactInput, setEditedEmergencyContactInput] = useState(emergencyContactInput);

  useEffect(() => {
    setPhoneNumberInput(editedPatient?.phone_number || "");
    setEmergencyContactInput(editedPatient?.emergency_contact || "");
  }, [editedPatient]);


  return (response as any)?.result?.map((patient: any) => (
    <div>
      {isEditing ? (
        <Accordion  sx={{ margin: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Grid p={4}>
              <Typography variant="h4">
                {patient.firstName} {patient.lastName}
              </Typography>
              <p>Patient Details</p>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>

            <Container maxWidth={"lg"}>

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
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    defaultValue={patient.firstName || ""}
                    // value={editedPatient?.firstName || ""}
                    onChange={(event) => {
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        firstName: event.target.value,
                      }));
                    }}
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
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    defaultValue={patient.lastName || ""}
                    // value={editedPatient?.lastName || ""}
                    onChange={(event) => {
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        lastName: event.target.value,
                      }));
                    }}
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
                    label="Emergency Contact Person Number"
                    value={phoneNumberInput}
                    onChange={(value: string, info: MuiTelInputInfo) => {
                      setPhoneNumberInput(value);
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        phone_number: value,
                      }));
                    }}
                    defaultCountry="HK"
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
                    defaultValue={patient.emergency_name}
                    onChange={(event) => {
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        emergency_name: event.target.value,
                      }));
                    }}
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
                    onChange={(value: string, info: MuiTelInputInfo) => {
                      setEmergencyContactInput(value);
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        emergency_contact: value,
                      }));
                    }}
                    defaultCountry="HK"
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
            </Container></AccordionDetails>
        </Accordion>
      ) : (
        <Accordion  sx={{ margin: 2 }} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Grid p={4}>
              <Typography variant="h4">
                {patient.firstName} {patient.lastName}
              </Typography>
              <p>Patient Details</p>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Container maxWidth={"lg"}>
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
            </Container>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  ));
}
