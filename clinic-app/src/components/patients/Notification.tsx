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
import { Button, Card, Grid, Typography } from "@mui/material";

export default function Notification() {
  const [open, setOpen] = useState(true);
  const [checked, setChecked] = useState<number[]>([]);
  const [intervalIds, setIntervalIds] = useState<
    Record<number, ReturnType<typeof setInterval>>
  >({});
  const userId = (jwtDecode(localStorage.getItem("patientToken")!) as any)
    .userId;
  const diagnosisMessage: any = useNotificationMessages(userId);
  const [medId, setMedId] = useState()

  const queryClient = useQueryClient();

  const onTicked = useMutation({
    mutationFn: async () => UpdatingNotificationInfo(userId,medId),
    onSuccess: async (message) => {
      console.log(message);
      await queryClient.invalidateQueries({
        queryKey: ["notificationMessages"],
      });
    },
  });

  const handleToggle = (value: any) => {
   setMedId(value)
   onTicked.mutate()

  };

  const startNotificationInterval = (medicineId: number) => {
    const intervalId = setInterval(() => {
      console.log(
        `Displaying notification for medicine ${medicineId} every 4 hours`
      );
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
    <Grid>
    <Card
            sx={{
              zIndex: -2,
              height: "1000",
              padding: 2,
              backgroundColor: "rgb(140,219,211)",
            }}
          >
            {" "}
            <Typography textAlign={"center"}><b>
              Notification</b></Typography>
          </Card>
    <List
      sx={{ width: "100%", bgcolor: "background.paper", }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
      
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
                // <Button
                  
                //   onClick={handleToggle(value.medicine_id)}
                //   checked={checked.indexOf(value.medicine_id) !== -1}
                  
                // />
                <Button
                onClick={() => handleToggle(value.medicine_id)}
                // checked={checked.indexOf(value.medicine_id) !== -1}
              >
                hi
              </Button>
              }
              disablePadding
              style={{
                display:
                  open || checked.indexOf(value.medicine_id) === -1
                    ? "block"
                    : "none",
              }}
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
                    <div>{value.medicine_id}</div>
                      <div>Drug name: {value.generic_drug}</div>
                      <div>
                        Dosage: {value.dosage} {value.unit_measurement}
                      </div>
                      <div>
                        Frequency: {value.frequency_per_day} times per day
                      </div>
                      <div>taken_count_today: {value.taken_count_today}</div>
                      <div>Total_Quantity: {value.total_quantity}</div>
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
    </Grid>
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
