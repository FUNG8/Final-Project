import * as React from "react";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Portal } from "@mui/base/Portal";
import { FocusTrap } from "@mui/base/FocusTrap";
import { unstable_useModal as useModal } from "@mui/base/unstable_useModal";
import Fade from "@mui/material/Fade";
import { ThemeProvider } from "styled-components";
import {
  Box,
  CssBaseline,
  Divider,
  Grid,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAllMedicineInfo } from "../../api/medicineAPI";
import { DrugInstruction } from "./DrugInstruction";
import { insertDiagnosis } from "../../api/diagnosisAPI";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function InsertDiagnosisModal() {
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDemoInstructions([]);
    setSymptomsInput("");
    setRemarksInput("");
  };
  const defaultTheme = createTheme();
  const [symptomsInput, setSymptomsInput] = useState("");
  const [remarksInput, setRemarksInput] = useState("");
  //step 1 get the med info at the form ,later use in instruction
  const medicineinfo = useAllMedicineInfo();
  //step 2 map them in meds
  const meds = (medicineinfo as any)?.medicineResult;
  //step 3 setup demoinstruction to store the array of input values(key value pair)
  const [demoInstructions, setDemoInstructions] = useState<any[]>([]);
  console.log("demooo", demoInstructions);
  // step 5b clicked button will make empty space for the value to store
  const handleAddInstruction = async (e: any) => {
    e.preventDefault();
    try {
      // queryClient.invalidateQueries({ queryKey: ["MedicineInfo"] });
      let instruction = {
        index: new Date().toString(),
        quantity: null,
        method: null,
        periodDay: null,
        periodHour: null,
        frequencyPerDay: null,
        dosagePerServing: null,
        remarks: null,
      };
      //step 6b it will add the empty space to the step 3 constructed demoInstruction,
      //adding the object instruction into the array
      setDemoInstructions([...demoInstructions, instruction]);
    } catch (error) {
      console.error("Error adding Medicine:", error);
    }
  };

  const handleDeleteInstruction = (targetIndex: string) => {
    console.log("targetidx",targetIndex)
    let deletedDemoInstructions = demoInstructions.filter(
      (entry) => (entry.index !== targetIndex)
    );
    setDemoInstructions(deletedDemoInstructions);
  };
  //Step 5a While value from instruction input fields are back it locates the object in array by idx
  const handleInstructionChange = (
    targetIndex: number,
    medicineId: number,
    unit: number,
    quantity: number,
    method: string,
    periodDay: number,
    periodHour: number,
    frequencyPerDay: number,
    dosagePerServing: number,
    remarks: string
  ) => {
    let newDemoInstructions = demoInstructions.map((entry) => {
      console.log(entry.index);
      if (entry.index == targetIndex)
        //using values to return and re-set into demoInstruction instruction
        return {
          ...entry,
          medicineId: medicineId,
          unit: unit,
          quantity: quantity,
          method: method,
          periodDay: periodDay,
          periodHour: periodHour,
          frequencyPerDay: frequencyPerDay,
          dosagePerServing: dosagePerServing,
          remarks: remarks,
        };
      else return entry;
    });

    console.log("check new Demo instructions", newDemoInstructions);

    setDemoInstructions(newDemoInstructions);
  };

  //mutation and submit
  const onSubmit = useMutation({
    mutationFn: async (data: {
      d_name: string;
      d_doctor_id: number;
      d_patient_id: number;
      d_remarks: string;
      d_created_at: string;
      d_updated_at: string;
      demoInstructions: any;
    }) =>
      insertDiagnosis(
        data.d_name,
        data.d_doctor_id,
        data.d_patient_id,
        data.d_remarks,
        data.d_created_at,
        data.d_updated_at,
        data.demoInstructions
      ),
    onSuccess: (data) => {
      console.log("mutate on success");
      console.log("On Insert Medicine", data);
      // handleAddInstruction();
      handleClose();
      setDemoInstructions([]);
      setSymptomsInput("");
      setRemarksInput("");
      queryClient.invalidateQueries({ queryKey: ["showDiagnosis"] });
    },
    onError: (e) => {
      console.log("mutate on error");
      console.log("On error!!", e);
    },
  });

  //get patient and doctor id
  let { patientId } = useParams();
  const [drid, setDrid] = useState("");
  useEffect(() => {
    const drToken = localStorage.getItem("clinicToken");
    if (drToken) {
      let decoded: any = jwtDecode(drToken);
      const doctorId = decoded["userId"];
      setDrid(doctorId);
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    console.log("current time is" + currentTime);
    onSubmit.mutate({
      d_name: symptomsInput,
      d_doctor_id: parseInt(drid!),
      d_patient_id: parseInt(patientId!),
      d_remarks: remarksInput,
      d_created_at: currentTime,
      d_updated_at: currentTime,
      demoInstructions: demoInstructions,
    });
  };

  return (
    <div>
      <Grid sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
        <Button variant="contained" onClick={handleOpen}>
          <AddCircleOutlineIcon /> Insert Diagnosis Information
        </Button>
      </Grid>

      <Modal
        // disableScrollLock={true}
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
                className="modalheight"
                container
                component="main"
                sx={{ height: "80vh", justifyContent: "center" }}
              >
                <Grid className="nigga" mx={4}>
                  <Typography component="h1" variant="h4">
                    Diagnosis
                  </Typography>
                  {/* -------------------Symptoms and Remarks------------------- */}

                  {/* Symptoms */}
                  <TextField
                    value={symptomsInput}
                    onChange={(e) => setSymptomsInput(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    id="symptoms"
                    label="Symptoms"
                    autoComplete="symptoms"
                    autoFocus
                  />
                  {/* Remarks */}
                  <TextField
                    value={remarksInput}
                    onChange={(e) => setRemarksInput(e.target.value)}
                    name="remarks"
                    margin="normal"
                    required
                    fullWidth
                    id="remarks"
                    label="Remarks"
                    autoComplete="remarks"
                  />
                  {/* -------------------Drug Instruction------------------- */}

                  {/* Step 4a map the instruction input fields giving them idx as mark and give it meds as options for medicine input field
if the changeFn is called from the instruction it will bring back value to handleinstructionchange() */}
                  {demoInstructions.map((entry, idx) => (
                    <DrugInstruction
                      idx={idx}
                      index={entry.index}
                      changeFn={handleInstructionChange}
                      deleteFn={handleDeleteInstruction}
                      medicineOptions={meds}
                    />
                  ))}
                  {/* Step 4b clicking button call add instruction()  */}
                  <Button
                    onClick={handleAddInstruction}
                    sx={{ alignItems: "center" }}
                  >
                    <AddCircleOutlineIcon />
                    Add Medicine/Instruction
                  </Button>
                  {/*------------------- Submit Button------------------- */}
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
                </Grid>
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
    overflow: auto;
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
