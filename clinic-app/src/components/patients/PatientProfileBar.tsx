import React, {  useState } from "react";
import "./PatientProfileBar.scss";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { login } from "../../api/patientAuthAPI";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { jwtDecode } from "jwt-decode";
import ProfileChangeBox from "./ProfileChangeBox";


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

export default function PatientProfileBar() {
    const [hkidInput, setHkidInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [users, setUsers] = useState<User[]>([]);;
    const [currentUser, setCurrentUser] = useState<User | null>(null);;
    const [errorMessage, setErrorMessage] = useState('');
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const queryClient = useQueryClient();
    const iconSize = { fontSize: 20 };

    const onLogin = useMutation({
        mutationFn: async (data: { hkid: string; password: string }) =>
            login(data.hkid, data.password),
        onSuccess: (data: string) => {
            console.log("On success checking", data);
            localStorage.setItem("patientToken", data);
            let tokenArrayString: string | null = localStorage.getItem("tokenArray")
            if (tokenArrayString) {
                console.log("tokenArray exist", tokenArrayString)
                let tokenArray: Array<string> = JSON.parse(tokenArrayString)
                localStorage.setItem("tokenArray", JSON.stringify([...tokenArray, data]))
            }
            const decoded: DecodedToken = jwtDecode(data);
            setUsers((prevUsers) => [
                ...prevUsers,
                {
                    firstName: decoded.firstName,
                    lastName: decoded.lastName,
                },
            ]);


            queryClient.invalidateQueries({ queryKey: ["authStatus", "profileData"] });
            setHkidInput('');
            setPasswordInput('');
            setAnchor(null);
            window.location.reload();

        },
        onError: (e) => {
            console.log("On error!!", e);
            setErrorMessage('Login failed.');
        },
    });

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Logging in");
        onLogin.mutate({ hkid: hkidInput, password: passwordInput });
    };



    const simplePopUp = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;

    
    return (
        <div id="mainContainer">
            <div className="profileBox">PROFILE</div>
            <Dropdown>
                <div id="iconBox">
                    <MenuButton className="switchButton">
                        Switch Account<VpnKeyIcon sx={{ iconSize }} />
                    </MenuButton>
                    <Menu slots={{ listbox: Listbox }}>

                        <ProfileChangeBox />

                        <MenuItem className="switchListItem" onClick={simplePopUp}>
                            Add Account<PersonAddIcon />
                        </MenuItem>

                        <BasePopup id={id} open={open} anchor={anchor}>
                            <PopupBody>
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
                                    <button className="switchAccButt" type="submit">Submit</button>
                                </form>
                                {errorMessage && <div>{errorMessage}</div>}
                            </PopupBody>
                        </BasePopup>

                    </Menu>
                </div>
            </Dropdown>

        </div>
    );
}

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E6',
    700: '#0059B3',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Listbox = styled('ul')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
        };
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
  `,
);

const PopupBody = styled('div')(
    ({ theme }) => `
  width: 250px;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${theme.palette.mode === 'dark'
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`
        };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`,
);