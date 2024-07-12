// hahahahaha
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

export default function useAuthStatusPatient() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["authStatus"],
    queryFn: async () => {
      let token = localStorage.getItem("patientToken");
      console.log("querying local storage token", token);
      if (!token) {
        throw Error("You haven't logged in");
      }

      let decoded = jwtDecode(token);
      console.log("check decoded", decoded);
      return decoded;
    },
    retry: false,
  });

  if (isLoading || isFetching) {
    return { status: "loading" };
  } else if (error) {
    return { status: "error", message: error.message };
  } else if (!data) {
    return { status: "no data" };
  }

  return { status: "success", data: data };
}

export async function createPatient(hkid: string,
  password: string,
  firstName: string,
  lastName: string,
  gender: string,
  blood: string,
  birth_date: string,
  phone_number: string,
  emergency_name: string,
  emergency_contact: string,
  created_at: string,
  updated_at: string) {
  console.log("Ready to fetch,HKID is:" + hkid)
  try {
    let res = await fetch(` ${process.env.REACT_APP_API_SERVER}/patientAuth/createPatient`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hkid, password, firstName, lastName, gender, blood, birth_date, phone_number, emergency_name, emergency_contact, created_at, updated_at }),
      }
    )
    let result = await res.json();
    if (!res.ok) {
      console.log(result)
      throw new Error(result.message)
    }
    return result;
  } catch (e) {
    throw e
  }

};

export async function login(hkidInput: string, passwordInput: string) {
  console.log("authAPI try to log in");
  let res = await fetch(
    `${process.env.REACT_APP_API_SERVER}/patientAuth/patientLogin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hkidInput, passwordInput }),
    }
  );

  if (res.ok) {
    let result = await res.json();

    return result.token as string;
  } else {
    throw Error("Login Failed")
  }
}

export function logout() {
  console.log("remove token");
  localStorage.removeItem("patientToken");

  try {
    console.log("logout success");
    window.location.href = "/";
  } catch (error) {
    console.error("logout failed", error);
  }
}
