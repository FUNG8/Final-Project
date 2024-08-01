import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import {
  UpdatingNotificationInfo,
  useNotificationMessages,
} from "../../api/NotificationAPI";
import { jwtDecode } from "jwt-decode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Notification() {
  const [open, setOpen] = useState(true);
  const [checked, setChecked] = useState<number[]>([]);
  const [intervalIds, setIntervalIds] = useState<Record<number, ReturnType<typeof setInterval>>>({});
  const userId = (jwtDecode(localStorage.getItem("patientToken")!) as any).userId;
  const diagnosisMessage: any = useNotificationMessages(userId);

  const queryClient = useQueryClient();

  const onTicked = useMutation({
    mutationFn: async () => UpdatingNotificationInfo(userId),
    onSuccess: async (message) => {
      console.log(message);
      await queryClient.invalidateQueries({
        queryKey: ["notificationMessages"],
      });
    },
  });

  const handleToggle = (value: number) => () => {
    const index = checked.indexOf(value);
    const newChecked = [...checked];
  
    if (index === -1) {
      newChecked.push(value);
      startNotificationInterval(value);
      setOpen(false);
      setTimeout(() => {
        setOpen(true);
        const updatedIndex = newChecked.indexOf(value);
        if (updatedIndex !== -1) {
          newChecked.splice(updatedIndex, 1);
          setChecked(newChecked);
        }
      }, 5 * 1000);
    } else {
      newChecked.splice(index, 1);
      clearNotificationInterval(value);
    }
  
    setChecked(newChecked);
  };

  const startNotificationInterval = (medicineId: number) => {
    const intervalId = setInterval(() => {
      console.log(`Displaying notification for medicine ${medicineId} every 5 seconds`);
      // Add your notification logic here
    }, 5 * 1000); // 5 seconds in milliseconds
    setIntervalIds((prevState) => ({
      ...prevState,
      [medicineId]: intervalId,
    }));
  };
  
  const clearNotificationInterval = (medicineId: number) => {
    if (intervalIds[medicineId]) {
      clearInterval(intervalIds[medicineId]);
      setIntervalIds((prevState) => {
        const newState = { ...prevState };
        delete newState[medicineId];
        return newState;
      });
    }
  };

  useEffect(() => {
    return () => {
      Object.values(intervalIds).forEach(clearInterval);
    };
  }, [intervalIds]);

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          New Notification Messeges
        </ListSubheader>
      }
    >
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {(diagnosisMessage as any).NotificationMessages?.map((value: any) => {
          const labelId = `checkbox-list-secondary-label-${value.medicine_id}`;
          return (
            <ListItem
              key={value.medicine_id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value.medicine_id)}
                  checked={checked.indexOf(value.medicine_id) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
              disablePadding
              style={{ display: open || checked.indexOf(value.medicine_id) === -1 ? 'block' : 'none' }}
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={value.name}
                  secondary={
                    <>
                      <div>Drug name: {value.generic_drug}</div>
                      <div>
                        Dosage: {value.dosage} {value.unit_measurement}
                      </div>
                      <div>
                        Frequency: {value.frequency_per_day} times per day
                      </div>
                      <div>Method: {value.method}</div>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </List>
  );
}

{
  /* <div>Duration: {value.period_day} days</div> */
}
{
  /* <div>Instructions: {value.instructions}</div> */
}
{
  /* <div>Side Effects: {value.side_effects}</div> */
}
