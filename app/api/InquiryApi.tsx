import { BASE_URL } from "../constans";
import { Form } from "../types/Post";

export const setInquiryApi = async (formData: Form) => {

  const res = await fetch(`${BASE_URL}/dev/contacts`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if(!res.ok){
    throw new Error("送信に失敗しました");
  }
}
