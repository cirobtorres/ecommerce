const clearCpfMask = (cpf: string) => {
  return cpf.replace(/\D/g, "");
};

const clearCnpjMask = (cnpj: string) => {
  return cnpj.replace(/\D/g, "");
};

const clearPhoneMask = (phone: string) => {
  return phone.replace(/\D/g, "");
};

const formatDate = (date: string) => {
  const dateTemplate = date.split("/");
  return dateTemplate[2] + "/" + dateTemplate[1] + "/" + dateTemplate[0];
};

export { clearCpfMask, clearCnpjMask, clearPhoneMask, formatDate };
