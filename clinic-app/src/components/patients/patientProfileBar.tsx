// hahahahaha
import { Height } from "@mui/icons-material";
import "./patientProfileBar.scss"
import SettingsIcon from '@mui/icons-material/Settings';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export default function patientProfileBar() {
  const iconSize = { fontSize: 30 }
  return (
    <div id="mainContainer">
      <div className="profileBox">PROFILE</div>
      <div id="iconBox">
        <div className="icon"><SettingsIcon sx={iconSize} /></div>
        <div className="icon"><VpnKeyIcon sx={iconSize} /></div>
      </div>
    </div>
  )
}