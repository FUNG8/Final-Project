import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from '@mui/base/useSnackbar';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { css, keyframes, styled } from '@mui/system';


export async function SendPatient(patientId: string) {
    
    console.log("send patient with ID~~~:", patientId);

    let res = await fetch(
        `${process.env.REACT_APP_API_SERVER}/homePatient/PatientNameforWaitingList/${patientId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ patientId }),
        }
    );

    let result = await res.json();
    console.log("showmeee the click result!!", result);
    return result;
}

