import { useQuery } from "@tanstack/react-query";



export function GetDrugShape() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["Show Drug Shape"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_SERVER}/drugShape/getDrugShape`
      );
      const result = await res.json();
      console.log(result);
      return { status: "success", data: result };
    },
  });
  if (isLoading || isFetching || error || !data) {
    return { status: "loading" };
  }

  return data;
}

export async function insertPatientDiagnosis(
  patient_id: string,
  medicine_id: string,
  symptoms: string,
  diagnosis_remarks: string,
  created_at: string,
  unit_measurement: string,
  total_quantity: number,
  method: string,
  period_day: number,
  period_hr: number,
  frequency_per_day: number,
  dosage_per_serving: number,
  remarks: string,
) {
  try {
    let res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/diagnosis/postDiagnosis/${patient_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          medicine_id,
          symptoms,
          diagnosis_remarks,
          created_at,
          unit_measurement,
          total_quantity,
          method,
          period_day,
          period_hr,
          frequency_per_day,
          dosage_per_serving,
          remarks
        }),
      }
    );

    let insertResult = await res.json();
    if (!res.ok) {
      console.log(insertResult);
      throw new Error(insertResult.message);
    }
    return insertResult;
  } catch (error) {
    console.error("Error inserting medicine:", error);
    throw error;
  }
}