import * as React from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
  CssBaseline,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import {  useQueryClient } from "@tanstack/react-query";
import { insertMedicine } from "../../api/medicineAPI";
import { GetDrugShape } from "../../api/drugAPI";

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
const typeOptions = [
  "Analgesics (painkillers)",
  "Antibiotics",
  "Antivirals",
  "Antidepressants",
  "Antihypertensives (blood pressure)",
  "Antidiabetics",
  "Antihistamines",
  "Chemotherapeutics (cancer)",
  "Immunosuppressants",
  "Agonists",
  "Antagonists",
  "Enzyme inhibitors",
  "Receptor modulators",
  "Natural/herbal",
  "Synthetic",
  "Biologic (e.g. proteins, vaccines)",
  "Oral",
  "Topical",
  "Intravenous",
  "Inhaled",
  "Transdermal",
  "Over-the-counter (OTC)",
  "Prescription-only",
  "Controlled substances",
  "Short-acting vs long-acting",
  "Immediate release vs extended release",
  "High therapeutic index (wide safety margin)",
  "Low therapeutic index (narrow safety margin)",
];
const colorOptions = [
  "White - 白色",
  "Yellow - 黃色",
  "Red - 紅色",
  "Blue - 藍色",
  "Green - 綠色",
  "Brown - 棕色",
  "Pink - 粉色",
  "Orange - 橙色",
];

export default function InsertMedicineModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const defaultTheme = createTheme();

  const [medicineNameInput, setMedicineNameInput] = useState("");
  const [genericDrugInput, setGenericDrugInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [dosageInput, setDosageInput] = useState("");
  const [unitInput, setUnitInput] = useState("");
  const [unit, setUnit] = React.useState<string | null>(unitOptions[0]);
  const [typeInput, setTypeInput] = useState("");
  const [type, setType] = React.useState<string | null>(typeOptions[0]);
  const [colorInput, setColorInput] = useState("");
  const [color, setColor] = React.useState<string | null>(colorOptions[0]);
  const [drugInput, setDrugInput] = useState("");
  const drug = GetDrugShape();
  const queryClient = useQueryClient();

  const handleAddMedicine = async () => {
    try {
      queryClient.invalidateQueries({ queryKey: ["MedicineInfo"] });
    } catch (error) {
      console.error("Error adding Medicine:", error);
    }
  };

  const handleDrugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDrugInput((event.target as HTMLInputElement).value);
  };

  //step1 set up mutation
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
      handleAddMedicine();
      handleClose();
    },
    onError: (e) => {
      console.log("mutate on error");
      console.log("On error!!", e);
    },
  });

  //step 2 trigger the mutation by action
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    console.log("current time is" + currentTime);

    onSubmit.mutate({
      name: medicineNameInput,
      generic_drug: genericDrugInput,
      description: descriptionInput,
      dosage: dosageInput,
      unit_measurement: unitInput,
      type: typeInput,
      drug_shape_id: drugInput,
      color: colorInput,
      created_at: currentTime,
      updated_at: currentTime,
    });
  };

  return (
    <div>
      <Grid
        xs={12}
        sx={{ display: "flex", justifyContent: "center", margin: 2 }}
      >
        <Tooltip title="Press here to insert new type of medicine">
        <Button  variant={"contained"} onClick={handleOpen}><AddCircleOutlineIcon />  Insert Medicines</Button>
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
                      value={medicineNameInput}
                      onChange={(e) => setMedicineNameInput(e.target.value)}
                      margin="normal"
                      required
                      fullWidth
                      id="medicineName"
                      label="Medicine Name"
                      autoComplete="medicineName"
                      autoFocus
                    />
                    {/* Generic Drug */}
                    <TextField
                      value={genericDrugInput}
                      onChange={(e) => setGenericDrugInput(e.target.value)}
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
                      value={descriptionInput}
                      onChange={(e) => setDescriptionInput(e.target.value)}
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
                        value={dosageInput}
                        onChange={(e) => setDosageInput(e.target.value)}
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
                          <TextField {...params} label="Unit" />
                        )}
                      />
                    </Grid>
                    {/* type and color */}
                    <Grid
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* type */}
                      <Autocomplete
                        sx={{ width: 300, mt: 0 }}
                        value={type}
                        onChange={(event: any, newtype: string | null) => {
                          setType(newtype);
                        }}
                        inputValue={typeInput}
                        onInputChange={(event, newInputValue) => {
                          setTypeInput(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={typeOptions}
                        fullWidth
                        renderInput={(params) => (
                          <TextField {...params} label="Medicine Type" />
                        )}
                      />
                      {/* color */}
                      <Autocomplete
                        sx={{ width: 300, mt: 0 }}
                        value={color}
                        onChange={(event: any, newcolor: string | null) => {
                          setColor(newcolor);
                        }}
                        inputValue={colorInput}
                        onInputChange={(event, newInputValue) => {
                          setColorInput(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={colorOptions}
                        fullWidth
                        renderInput={(params) => (
                          <TextField {...params} label="Medicine Color" />
                        )}
                      />
                    </Grid>
                    {/* Drug Shape */}
                    <Grid
                      sx={{
                        mt: 2,
                      }}
                    >
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Medicine Shape
                      </FormLabel>
                      <Grid>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={drugInput}
                          onChange={handleDrugChange}
                        >
                          {drug.status === "success" &&
                            (drug as any).data.map(
                              (drug: any, index: number) => (
                                <FormControlLabel
                                  key={index}
                                  value={parseInt(drug.id)}
                                  control={<Radio />}
                                  label={drug.shape}
                                />
                              )
                            )}
                        </RadioGroup>
                      </Grid>
                    </Grid>
                    {/* Submit Button */}
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
  overflow:'scroll',
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
