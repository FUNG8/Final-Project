import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useShowPatientInfo } from "../api/patientAPI";
import { useParams, useSearchParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: 8,
  textAlign: "center",
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

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

  return (patients as any)?.result?.map((patient: any) => (
    <div>
      <Box justifyContent="center" mt={2}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "0.5rem",
            }}
          >
            <h2>Patient Details</h2>
          </div>
          <Box sx={{ width: 1730 }}>
            <Stack
              spacing={{ sm: 2, md: 3 }}
              direction={{ xs: "column", sm: "row" }}
              useFlexGap
              flexWrap="wrap"
            >
              <Box sx={{ flex: "1 1 50%" }} style={{ display: "flex" }}>
                <Item>ID</Item>
                {isEditing ? (
                  <TextField
                    id="outlined-basic"
                    label="ID"
                    variant="outlined"
                    value={editedPatient?.id || ""}
                    onChange={(event) => {
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        id: event.target.value,
                      }));
                    }}
                  />
                ) : (
                  <Item>{patient.id}</Item>
                )}
                <Item>Gender</Item>
                {isEditing ? (
                  <TextField
                    id="outlined-basic"
                    label="Gender"
                    variant="outlined"
                    value={editedPatient?.gender || ""}
                    onChange={(event) => {
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        gender: event.target.value,
                      }));
                    }}
                  />
                ) : (
                  <Item>{patient.gender}</Item>
                )}
              </Box>
              <Box sx={{ flex: "1 1 50%" }} style={{ display: "flex" }}>
                <Item>First Name</Item>
                {isEditing ? (
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    value={editedPatient?.firstName || ""}
                    onChange={(event) => {
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        firstName: event.target.value,
                      }));
                    }}
                  />
                ) : (
                  <Item>{patient.firstName}</Item>
                )}
                <Item>Last Name</Item>
                {isEditing ? (
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    value={editedPatient?.lastName || ""}
                    onChange={(event) => {
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        lastName: event.target.value,
                      }));
                    }}
                  />
                ) : (
                  <Item>{patient.lastName}</Item>
                )}
              </Box>
              <Box sx={{ flex: "1 1 50%" }} style={{ display: "flex" }}>
                <Item>HKID</Item>
                {isEditing ? (
                  <TextField
                    id="outlined-basic"
                    label="HKID"
                    variant="outlined"
                    value={editedPatient?.hkid || ""}
                    onChange={(event) => {
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        hkid: event.target.value,
                      }));
                    }}
                  />
                ) : (
                  <Item>{patient.hkid}</Item>
                )}
                <Item>Birth Date</Item>
                {isEditing ? (
                  <TextField
                    id="outlined-basic"
                    label="Birth Date"
                    variant="outlined"
                    value={editedPatient?.birth_date || ""}
                    onChange={(event) => {
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        birth_date: event.target.value,
                      }));
                    }}
                  />
                ) : (
                  <Item>{patient.birth_date}</Item>
                )}
              </Box>
              <Box sx={{ flex: "1 1 50%" }} style={{ display: "flex" }}>
                <Item>Blood Type</Item>
                {isEditing ? (
                  <TextField
                    id="outlined-basic"
                    label="Blood Type"
                    variant="outlined"
                    value={editedPatient?.blood || ""}
                    onChange={(event) => {
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        blood: event.target.value,
                      }));
                    }}
                  />
                ) : (
                  <Item>{patient.blood}</Item>
                )}
                <Item>Phone Number</Item>
                {isEditing ? (
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    value={editedPatient?.phone_number || ""}
                    onChange={(event) => {
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        phone_number: event.target.value,
                      }));
                    }}
                  />
                ) : (
                  <Item>{patient.phone_number}</Item>
                )}
              </Box>
              <Box sx={{ flex: "1 1 50%" }} style={{ display: "flex" }}>
                <Item>Emergency Name</Item>
                {isEditing ? (
                  <TextField
                    id="outlined-basic"
                    label="Emergency Name"
                    variant="outlined"
                    value={editedPatient?.emergency_name || ""}
                    onChange={(event) => {
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        emergency_name: event.target.value,
                      }));
                    }}
                  />
                ) : (
                  <Item>{patient.emergency_name}</Item>
                )}
                <Item>Emergency Contact</Item>
                {isEditing ? (
                  <TextField
                    id="outlined-basic"
                    label="Emergency Contact"
                    variant="outlined"
                    value={editedPatient?.emergency_contact || ""}
                    onChange={(event) => {
                      setEditedPatient((prevPatient) => ({
                        ...prevPatient!,
                        emergency_contact: event.target.value,
                      }));
                    }}
                  />
                ) : (
                  <Item>{patient.emergency_contact}</Item>
                )}
              </Box>
              <Box sx={{ flex: "1 1 50%" }} style={{ display: "flex" }}>
                <Item>Updated At</Item>
                <Item>{patient.updated_at}</Item>
                <Item>Created At</Item>
                <Item>{patient.created_at}</Item>
              </Box>
            </Stack>
          </Box>
        </div>
        <Box sx={{ width: 1730, display: "flex", justifyContent: "center" }}>
          <Stack spacing={{ sm: 4, md: 8 }} direction="row">
            {isEditing ? (
              <Button
                variant="contained"
                disableElevation
                onClick={handleSaveClick}
              >
                SAVE
              </Button>
            ) : (
              <Button
                variant="contained"
                disableElevation
                onClick={handleEditClick}
              >
                EDIT
              </Button>
            )}
            <Button variant="contained" disableElevation>
              HISTORY
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  ));
}
