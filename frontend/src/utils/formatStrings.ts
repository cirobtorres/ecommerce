export const formatDocument = (
  cpf: string,
  format: "frontend" | "backend" = "frontend"
) => {
  /* 
  format: 
    - "frontend" if you're sending data to backend
    - "backend" if you're receiving data from backend
  */
  if (format === "frontend") {
    return cpf.replace(/\D/g, "");
  } else {
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
      6,
      9
    )}-${cpf.slice(9)}`;
  }
};

export const formatPhone = (
  phone: string,
  format: "frontend" | "backend" = "frontend"
) => {
  /* 
  format: 
    - "frontend" if you're sending data to backend
    - "backend" if you're receiving data from backend
  */
  if (format === "frontend") {
    return phone.replace(/\D/g, "");
  } else {
    return `(${phone.slice(0, 2)})${phone.slice(2, 7)}-${phone.slice(7)}`;
  }
};

export const formatDate = (
  birth: string,
  format: "frontend" | "backend" = "frontend",
  separator: string = "-"
) => {
  /* 
  format: 
    - "frontend" if you're sending data to backend
    - "backend" if you're receiving data from backend
  */
  if (birth !== "") {
    const date = birth.split(format === "frontend" ? "/" : "-");
    return `${date[2]}${separator}${date[1]}${separator}${date[0]}`;
  }
  return "";
};
