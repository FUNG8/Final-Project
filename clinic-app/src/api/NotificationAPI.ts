import { useQuery } from "@tanstack/react-query";

export function useNotificationMessages(userId: string) {
    console.log("User ID:", userId);
    const { isLoading, error, data, isFetching } = useQuery({
      queryKey: ["notificationMessages", userId],
      queryFn: async () => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/notification/showDrugInstruction/${userId}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("patientToken")}`,
          },
        });
        const result = await res.json();
        console.log("Notification Messages:", result);
        return { status: "success", NotificationMessages: result};
      },
    });
  
    if (isLoading || isFetching || error || !data) {
      return { status: "loading" };
    }
  
    return data;
  }


  export function UpdatingNotificationInfo(userId: string, medId:any) {
    console.log("User ID:", userId, medId);
    const { isLoading, error, data, isFetching } = useQuery({
      queryKey: ["updatingNotificationInfo", userId],
      queryFn: async () => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/notification/updatedNotificationInfo/${userId}/medicineId=${medId}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("patientToken")}`,
            "Content-Type": "application/json"
          },
        });
        const result = await res.json();
        console.log("Updating Notification Messages:", result);
        return { status: "success", UpdatedNotificationMessages: result};
      },
    });
  
    if (isLoading || isFetching || error || !data) {
      return { status: "loading" };
    }
  
    return data;
  }

  export async function CreatingNotificationInfo(diagnosisId: string) {
    console.log("thius is userId",diagnosisId)
    try {
      // Retrieve selected data
      const selectQuery = 'SELECT * FROM drug_instruction JOIN medicine ON drug_instruction.medicine_id = medicine.id JOIN diagnosis ON drug_instruction.diagnosis_id = diagnosis.id WHERE diagnosis.id = $1';
      const selectResult = await fetch(`${process.env.REACT_APP_API_SERVER}/notification/newNotificationInfo/${diagnosisId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: selectQuery, params: [diagnosisId] }),
      });
      const selectedData = await selectResult.json();
      console.log("Selected data:", selectedData);
  
      for (let i = 0; i < selectedData.length; i++) {
        const selectedRow = selectedData[i];
        const { medicine_id, diagnosis_id } = selectedRow;
  
        const newData = {
          medicine_id: medicine_id,
          diagnosis_id: diagnosis_id,
        };
  
        const insertResult = await fetch(`${process.env.REACT_APP_API_SERVER}/notification/newNotificationInfo/${diagnosisId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });
        const insertedData = await insertResult.json();
        console.log("New data inserted:", insertedData);
      }
  
      console.log("Data insertion complete");
    } catch (error) {
      console.error("Error retrieving or inserting data:", error);
    }

  };
