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
import { createPatient } from "../api/patientAuthAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { insertMedicine } from "../api/medicineAPI";

const unitOptions = [
  "毫克 mg",
  "微克 μg",
  "克 g",
  "國際單位 IU",
  "毫升 mL",
  "液量盎司 fl oz",
  "滴 gtt",
  "泰瑟 tsp",
  "湯匙 tbsp",
];
const bloodOptions = ["A", "B", "AB", "O"];

export default function InsertMedicineModal() {
  let medicineNameInput = useRef(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const defaultTheme = createTheme();

  const [unitInput, setUnitInput] = useState("");
  const [unit, setUnit] = React.useState<string | null>(unitOptions[0]);
  const [birthDateInput, setBirthDateInput] = React.useState<Dayjs | null>(
    dayjs("2000-01-01")
  );
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [emergencyNameInput, setEmergencyNameInput] = useState("");
  const [emergencyContactInput, setEmergencyContactInput] = useState("");

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
      name: string;
      generic_drug: string;
      description: string;
      dosage: string;
      unit_measurement: string;
      type: string;
      drug_shape_id: string;
      color: string;
      created_at: string;
      updated_at: string;
    }) =>
      insertMedicine(
        data.name,
        data.generic_drug,
        data.description,
        data.dosage,
        data.unit_measurement,
        data.type,
        data.drug_shape_id,
        data.color,
        data.created_at,
        data.updated_at
      ),
    onSuccess: (data) => {
      console.log("mutate on success");
      console.log("On Insert Medicine", data);
      handleAddPatient();
      handleClose();

      //   queryClient.invalidateQueries({ queryKey: ["authStatus"] });
    },
    onError: (e) => {
      console.log("mutate on error");
      console.log("On error!!", e);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(e.target[0]);
    // @ts-ignore
    console.log("G9G",medicineNameInput!.current);
    // console.log("GG", e.target.querySelector(".hihi > div > div > input").value);
    const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    console.log("current time is" + currentTime);

    // onSubmit.mutate({

    //   name:medicineName
    // });
  };

  return (
    <div>
      <TriggerButton onClick={handleOpen}>Create Patients</TriggerButton>
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
                    Insert New Medicine
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    sx={{ mt: 0 }}
                    onSubmit={handleSubmit}
                  >
                    {/* medicine name */}
                    <TextField
                      name="medicineName"
                      margin="normal"
                      required
                      fullWidth
                      id="medicineName"
                      label="Medicine Name"
                      autoComplete="medicineName"
                      autoFocus
                      ref={medicineNameInput}
                    />
                    {/* Generic Drug */}
                    <TextField
                      name="genericDrug"
                      margin="normal"
                      required
                      fullWidth
                      id="genericDrug"
                      label="Generic Drug"
                      autoComplete="genericDrug"
                      autoFocus
                    />
                    {/* description */}
                    <TextField
                      name="description"
                      margin="normal"
                      required
                      fullWidth
                      id="description"
                      label="Description"
                      autoComplete="description"
                      autoFocus
                    />
                    {/* dosage and unit */}
                    <Grid
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* doseage */}
                      <TextField
                        name="dosage"
                        sx={{ width: 300, mt: 0 }}
                        value={emergencyContactInput}
                        onChange={(e) =>
                          setEmergencyContactInput(e.target.value)
                        }
                        margin="normal"
                        required
                        id="dosage"
                        label="Dosage"
                        autoComplete="dosage"
                        autoFocus
                        type="number"
                        inputProps={{ maxLength: 8 }}
                      />
                      {/* unit */}
                      <Autocomplete
                        /* 
                        // @ts-ignore */

                        className="hihi"
                        value={unit}
                        onChange={(event: any, newunit: string | null) => {
                          setUnit(newunit);
                        }}
                        inputValue={unitInput}
                        onInputChange={(event, newInputValue) => {
                          setUnitInput(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={unitOptions}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="unit" />
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
                            name="date"
                            value={birthDateInput}
                            onChange={(newValue) => setBirthDateInput(newValue)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      {/* Phone Number */}

                      <TextField
                        sx={{ width: 300, mt: 1, mb: 0 }}
                        value={phoneNumberInput}
                        onChange={(e) => setPhoneNumberInput(e.target.value)}
                        margin="normal"
                        required
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        autoFocus
                        type="number"
                        inputProps={{ maxLength: 8 }}
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

                      <TextField
                        sx={{ width: 300, mt: 1 }}
                        value={emergencyContactInput}
                        onChange={(e) =>
                          setEmergencyContactInput(e.target.value)
                        }
                        margin="normal"
                        required
                        id="emergencyContact"
                        label="Emergency Contact Person Number"
                        name="emergencyContact"
                        autoComplete="emergencyContact"
                        autoFocus
                        type="number"
                        inputProps={{ maxLength: 8 }}
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
                        type="submit"
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
