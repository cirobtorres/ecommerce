export const cepMask = (event: React.FormEvent<HTMLInputElement>) => {
  // CEP: 00000-000
  event.currentTarget.maxLength = 9;
  let value = event.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{5})(\d)/, "$1-$2");
  event.currentTarget.value = value;
  return event;
};

export const phoneMask = (event: React.FormEvent<HTMLInputElement>) => {
  // phone: (00)00000-0000
  event.currentTarget.maxLength = 14;
  let value = event.currentTarget.value;
  if (!value.match(/^\(\d{2}\)\d{5}-\d{4}$/)) {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    event.currentTarget.value = value;
  }
  return event;
};

export const dateMask = (event: React.FormEvent<HTMLInputElement>) => {
  // date: 00/00/0000
  event.currentTarget.maxLength = 10;
  let value = event.currentTarget.value;
  if (!value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    event.currentTarget.value = value;
  }
  return event;
};

export const cpfMask = (event: React.FormEvent<HTMLInputElement>) => {
  // CPF: 000.000.000-00
  event.currentTarget.maxLength = 14;
  let value = event.currentTarget.value;
  if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{2})$/, "$1-$2");
    event.currentTarget.value = value;
  }
  return event;
};

export const cnpjMask = (event: React.FormEvent<HTMLInputElement>) => {
  // CNPJ: 000.000.000/0000-00
  event.currentTarget.maxLength = 19;
  let value = event.currentTarget.value;
  if (!value.match(/^(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})$/)) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1/$2");
    value = value.replace(/(\d{4})(\d{2})$/, "$1-$2");
    event.currentTarget.value = value;
  }
  return event;
};
