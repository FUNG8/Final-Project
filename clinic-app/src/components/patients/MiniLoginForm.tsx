import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { login } from "../../api/patientAuthAPI";
import { Grid } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface User {
  firstName: string;
  lastName: string;
}

interface DecodedToken {
  userId: number;
  firstName: string;
  lastName: string;
  hkid: string;
}

export default function MiniLoginForm() {
  const [hkidInput, setHkidInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();
  const iconSize = { fontSize: 20 };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Logging in");
    onLogin.mutate({ hkid: hkidInput, password: passwordInput });
  };
  const onLogin = useMutation({
    mutationFn: async (data: { hkid: string; password: string }) =>
      login(data.hkid, data.password),
    onSuccess: (data: string) => {
      console.log("On success checking", data);
      localStorage.setItem("patientToken", data);
      let tokenArrayString: string | null = localStorage.getItem("tokenArray");
      if (tokenArrayString) {
        console.log("tokenArray exist", tokenArrayString);
        let tokenArray: Array<string> = JSON.parse(tokenArrayString);
        localStorage.setItem(
          "tokenArray",
          JSON.stringify([...tokenArray, data])
        );
      }
      const decoded: DecodedToken = jwtDecode(data);
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          firstName: decoded.firstName,
          lastName: decoded.lastName,
        },
      ]);

      queryClient.invalidateQueries({
        queryKey: ["authStatus", "profileData"],
      });
      setHkidInput("");
      setPasswordInput("");
      setAnchor(null);
      window.location.reload();
    },
    onError: (e) => {
      console.log("On error!!", e);
      setErrorMessage("Login failed.");
    },
  });

  return (
    <div>
      <Button
        sx={{ width: "100%", marginBottom: 1 }}
        variant="contained"
        onClick={handleOpen}
      >
        Add Account
        <PersonAddIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleFormSubmit}>
            <div className="switchBox">User Login :</div>
            <div className="switchAccForm">
              <label>HKID:</label>
              <input
                type="text"
                id="hkid"
                value={hkidInput}
                onChange={(e) => setHkidInput(e.target.value)}
                required
              />
            </div>
            <div className="switchAccForm">
              <label>Password:</label>
              <input
                type="password"
                id="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
              />
            </div>
            <button className="switchAccButt" type="submit">
              Submit
            </button>
          </form>
          {errorMessage && <div>{errorMessage}</div>}
        </Box>
      </Modal>
    </div>
  );
}
