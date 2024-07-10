// hahahahaha
import * as React from "react";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Portal } from "@mui/base/Portal";
import { FocusTrap } from "@mui/base/FocusTrap";
import { unstable_useModal as useModal } from "@mui/base/unstable_useModal";
import Fade from "@mui/material/Fade";
import { ThemeProvider } from "styled-components";
import {
  Autocomplete,
  Box,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import { createPatient } from "../../api/patientAuthAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MuiTelInput } from "mui-tel-input";

const genderOptions = ["male", "female"];
const bloodOptions = ["A", "B", "AB", "O"];

export default function InsertPatientModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const defaultTheme = createTheme();

  const [hkidInput, setHkidInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [gender, setGender] = React.useState<string | null>(genderOptions[0]);
  const [bloodInput, setBLoodInput] = useState("");
  const [blood, setBlood] = React.useState<string | null>(bloodOptions[0]);
  const [birthDateInput, setBirthDateInput] = React.useState<Dayjs | null>(
    dayjs("2000-01-01")
  );
  //phone field
  const [phoneNumberInput, setPhoneNumberInput] = React.useState("");
  const phoneChange = (newPhoneNumberInput: React.SetStateAction<string>) => {
    setPhoneNumberInput(newPhoneNumberInput);
  };
  const [emergencyNameInput, setEmergencyNameInput] = useState("");
  //emergencyContact
  const [emergencyContactInput, setEmergencyContactInput] = React.useState("");
  const emergencyContactChange = (newEmergencyContactInput: React.SetStateAction<string>) => {
    setEmergencyContactInput(newEmergencyContactInput);
  };
  const queryClient = useQueryClient();

  const handleAddPatient = async () => {
    try {
      queryClient.invalidateQueries({ queryKey: ["PatientInfo"] });
    } catch (error) {
      console.error("Error adding Patient:", error);
    }
  };
  const onSubmit = useMutation({
    mutationFn: async (data: {
      hkid: string;
      password: string;
      firstName: string;
      lastName: string;
      gender: string;
      blood: string;
      birth_date: string;
      phone_number: string;
      emergency_name: string;
      emergency_contact: string;
      created_at: string;
      updated_at: string;
    }) =>
      createPatient(
        data.hkid,
        data.password,
        data.firstName,
        data.lastName,
        data.gender,
        data.blood,
        data.birth_date,
        data.phone_number,
        data.emergency_name,
        data.emergency_contact,
        data.created_at,
        data.updated_at
      ),
    onSuccess: (data) => {
      console.log("mutate on success");
      console.log("On Creating Patient", data);
      handleAddPatient();
      handleClose();

      //   queryClient.invalidateQueries({ queryKey: ["authStatus"] });
    },
    onError: (e) => {
      console.log("mutate on error");
      console.log("On error!!", e);
    },
  });

  const handleSubmit = () => {
    const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    console.log("current time is" + currentTime);
    onSubmit.mutate({
      hkid: hkidInput,
      password: hkidInput,
      firstName: firstNameInput,
      lastName: lastNameInput,
      gender: genderInput,
      blood: bloodInput,
      birth_date: birthDateInput?.format("YYYY-MM-DD") || "",
      phone_number: phoneNumberInput,
      emergency_name: emergencyNameInput,
      emergency_contact: emergencyContactInput,
      created_at: currentTime,
      updated_at: currentTime,
    });
  };

  return (
    <div>
      <Grid xs={12} sx={{display:"flex",justifyContent:"center",margin:2}}>
      <Tooltip title = "Are there new patients? create their first profile here!">
      <TriggerButton onClick={handleOpen}>Create Patients</TriggerButton>
      </Tooltip>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <ThemeProvider theme={defaultTheme}>
              <Grid
                container
                component="main"
                sx={{ height: "80vh", justifyContent: "center" }}
              >
                <CssBaseline />
                <Box
                  sx={{
                    my: 2,
                    mx: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Create Patient
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 0 }}>
                    {/* HKID input */}
                    <TextField
                      value={hkidInput}
                      onChange={(e) => setHkidInput(e.target.value)}
                      margin="normal"
                      required
                      fullWidth
                      id="hkid"
                      label="HKID"
                      name="hkid"
                      autoComplete="hkid"
                      autoFocus
                    />
                    {/* first name */}
                    <TextField
                      value={firstNameInput}
                      onChange={(e) => setFirstNameInput(e.target.value)}
                      margin="normal"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="firstName"
                      autoFocus
                    />
                    {/* last name */}
                    <TextField
                      value={lastNameInput}
                      onChange={(e) => setLastNameInput(e.target.value)}
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lastName"
                      autoFocus
                    />
                    {/* Blood and Gender */}
                    <Grid
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Gender */}

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
                      {/* Blood */}

                      <Autocomplete
                        value={blood}
                        onChange={(event: any, newBlood: string | null) => {
                          setBlood(newBlood);
                        }}
                        inputValue={bloodInput}
                        onInputChange={(event, newInputValue) => {
                          setBLoodInput(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={bloodOptions}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Blood" />
                        )}
                      />
                    </Grid>

                    {/* date of birth and phone number */}
                    <Grid
                      sx={{
                        mt: 2,
                        mb: 0,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Birth Date */}

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          sx={{ my: 0 }}
                          components={["DatePicker", "DatePicker"]}
                        >
                          <DatePicker
                            sx={{ width: 300, mb: 0 }}
                            label="Date of Birth"
                            value={birthDateInput}
                            onChange={(newValue) => setBirthDateInput(newValue)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      {/* Phone Number */}

                      <MuiTelInput
                        sx={{ width: 300, mt: 1, mb: 0 }}
                        label="Phone Number"
                        value={phoneNumberInput}
                        onChange={phoneChange}
                        defaultCountry="HK"
                      />
                    </Grid>

                    {/* emergency contact person and number */}
                    <Grid
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* emergency contact person */}
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

                      {/* emergency contact Number */}

                      <MuiTelInput
                        sx={{ width: 300, mt: 1, mb: 0 }}
                        label="Emergency Contact Person Number"
                        value={emergencyContactInput}
                        onChange={emergencyContactChange}
                        defaultCountry="HK"
                      />
                    </Grid>

                    <Grid
                      sx={{
                        my: 4,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        sx={{ position: "absolute", width: 400 }}
                        variant="contained"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </ThemeProvider>
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  );
}

interface ModalProps {
  children: React.ReactElement;
  closeAfterTransition?: boolean;
  container?: Element | (() => Element | null) | null;
  disableAutoFocus?: boolean;
  disableEnforceFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  disablePortal?: boolean;
  disableRestoreFocus?: boolean;
  disableScrollLock?: boolean;
  hideBackdrop?: boolean;
  keepMounted?: boolean;
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  onTransitionEnter?: () => void;
  onTransitionExited?: () => void;
  open: boolean;
}

const Modal = React.forwardRef(function Modal(
  props: ModalProps,
  forwardedRef: React.ForwardedRef<HTMLElement>
) {
  const {
    children,
    closeAfterTransition = false,
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    onClose,
    open,
    onTransitionEnter,
    onTransitionExited,
    ...other
  } = props;

  const propsWithDefaults = {
    ...props,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted,
  };

  const {
    getRootProps,
    getBackdropProps,
    getTransitionProps,
    portalRef,
    isTopModal,
    exited,
    hasTransition,
  } = useModal({
    ...propsWithDefaults,
    rootRef: forwardedRef,
  });

  const classes = {
    hidden: !open && exited,
  };

  const childProps: {
    onEnter?: () => void;
    onExited?: () => void;
    tabIndex?: string;
  } = {};
  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = "-1";
  }

  // It's a Transition like component
  if (hasTransition) {
    const { onEnter, onExited } = getTransitionProps();
    childProps.onEnter = onEnter;
    childProps.onExited = onExited;
  }

  const rootProps = {
    ...other,
    className: clsx(classes),
    ...getRootProps(other),
  };

  const backdropProps = {
    open,
    ...getBackdropProps(),
  };

  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }

  return (
    <Portal ref={portalRef} container={container} disablePortal={disablePortal}>
      {/*
       * Marking an element with the role presentation indicates to assistive technology
       * that this element should be ignored; it exists to support the web application and
       * is not meant for humans to interact with directly.
       * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
       */}
      <CustomModalRoot {...rootProps}>
        {!hideBackdrop ? <CustomModalBackdrop {...backdropProps} /> : null}
        <FocusTrap
          disableEnforceFocus={disableEnforceFocus}
          disableAutoFocus={disableAutoFocus}
          disableRestoreFocus={disableRestoreFocus}
          isEnabled={isTopModal}
          open={open}
        >
          {React.cloneElement(children, childProps)}
        </FocusTrap>
      </CustomModalRoot>
    </Portal>
  );
});

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean }>(
  (props, ref) => {
    const { open, ...other } = props;
    return (
      <Fade in={open}>
        <div ref={ref} {...other} />
      </Fade>
    );
  }
);

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  Height: 800,
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const CustomModalRoot = styled("div")`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomModalBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const TriggerButton = styled(Button)(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }
  `
);
