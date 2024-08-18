"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearCnpjMask,
  clearCpfMask,
  clearPhoneMask,
  formatDate,
} from "../../functions/formating";
import { fetchCompanySignUp } from "../fetchCompanyData";
import { fetchPersonSignUp } from "../fetchPersonData";

const signUpWithEmail = async (
  state: State,
  formData: FormData
): Promise<State> => {
  function searchForAnyErrors(errorObj: { [key: string]: boolean }) {
    // Errors --------------------------------------------------
    // Loop through invalidDatas object and filter for any true atribute
    // rebuilding a new object called error and return it if any exists
    const errors = Object.fromEntries(
      Object.entries(errorObj).filter((attr) => {
        if (attr[1]) return attr;
      })
    );

    if (Object.keys(errors).length !== 0) return { errors };

    return false;
  }

  // Get general datas --------------------------------------------------
  const email = formData.get("email") as string;
  const password = formData.get("password1") as string;
  const passwordConfirmation = formData.get("password2") as string;
  const passwordRules: PassErrorState = JSON.parse(
    formData.get("password-rules") as string
  );
  const name = formData.get("name") as string;
  const date = formData.get("date") as string;
  const phone = formData.get("phone") as string;
  const agreedDataPolicies = formData.get("refrigel-privacy-policies")
    ? true
    : false;
  const allowEmailNewsletter = formData.get("refrigel-newsletter")
    ? true
    : false; // Optional

  // Validations --------------------------------------------------
  // A value of true means there is an error on the form
  const invalidDatasInitialState = {
    emailBlankError: false,
    emailExistError: false,
    passwordBlankError: false,
    passwordsNotMatchError: false,
    nameBlankError: false,
    brandNameBlankError: false,
    legalNameBlankError: false,
    genderNotSpecifiedError: false,
    taxInfoInvalidError: false,
    ieBlankError: false,
    cpfBlankError: false,
    cpfInvalidError: false,
    cpfExistError: false,
    cnpjBlankError: false,
    cnpjInvalidError: false,
    cnpjExistError: false,
    dateBlankError: false,
    dateInvalidError: false,
    phoneBlankError: false,
    phoneInvalidError: false,
    agreedDataPolicies: false,
  };

  const invalidDatas = { ...invalidDatasInitialState, ...passwordRules };

  // Password --------------------------------------------------
  if (!password) invalidDatas.passwordBlankError = true;
  if (password !== passwordConfirmation) {
    invalidDatas.passwordsNotMatchError = true;
  }

  if (!email) {
    // Email --------------------------------------------------
    invalidDatas.emailBlankError = true;
  } else {
    const doesEmailExists = await fetch(
      "http://localhost:8000/api/auth/user/exists/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (!doesEmailExists) {
      invalidDatas.emailExistError = true;
    }
  }

  // Name --------------------------------------------------
  if (!name) {
    invalidDatas.nameBlankError = true;
  }

  // Phone --------------------------------------------------
  if (!phone) {
    invalidDatas.phoneBlankError = true;
  } else {
    const phoneRegex = /^(?:[0-9]{2})(?:[0-9]{8}|9[0-9]{8})$/;
    if (!phoneRegex.test(clearPhoneMask(phone))) {
      invalidDatas.phoneInvalidError = true;
    }
  }

  // Date --------------------------------------------------
  if (!date) {
    invalidDatas.dateBlankError = true;
  } else {
    const dateRegex =
      /^(?:(?:(?:19|20)\d\d)[\-\/](?:(?:0[13578]|1[02])[\-\/](?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)[\-\/](?:0[1-9]|[12]\d|30)|02[\-\/](?:0[1-9]|1\d|2[0-8]))|(?:19|20)(?:[02468][048]|[13579][26])[\-\/]02[\-\/]29)$/;

    // The backend only accepts date on these following formats: yyyy/mm/dd or yyyy-mm-dd
    if (!dateRegex.test(formatDate(date))) {
      invalidDatas.dateInvalidError = true;
    }
  }

  // Data Policies --------------------------------------------------
  if (!agreedDataPolicies) invalidDatas.agreedDataPolicies = true;

  const userType = formData.get("radio_type") as string;

  if (userType === "PF") {
    // Get specific person datas --------------------------------------------------
    const cpf = formData.get("cpf") as string;
    const gender = formData.get("gender") as string;

    // CPF --------------------------------------------------
    if (!cpf) {
      invalidDatas.cpfBlankError = true;
    } else {
      const doesCpfExists = await fetch(
        "http://localhost:8000/api/auth/user/exists/cpf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cpf: clearCpfMask(cpf) }),
        }
      );

      if (!doesCpfExists.ok) {
        await doesCpfExists.json().then((error) => {
          if (error.message === "CPF invalid")
            invalidDatas.cpfInvalidError = true;
          if (error.message === "CPF exists") invalidDatas.cpfExistError = true;
        });
      }
    }

    // Gender --------------------------------------------------
    if (gender === "N") {
      invalidDatas.genderNotSpecifiedError = true;
    }

    // Errors --------------------------------------------------
    const errors = searchForAnyErrors(invalidDatas);
    if (errors) return errors;

    // Fetch --------------------------------------------------
    const personBody = {
      email,
      password,
      phone: clearPhoneMask(phone),
      name,
      cpf: clearCpfMask(cpf),
      gender,
      birth_date: formatDate(date),
      allow_email_newsletter: allowEmailNewsletter,
      agreed_data_policies: agreedDataPolicies,
    };

    const personSignUpResponse = await fetchPersonSignUp(personBody);

    if (!personSignUpResponse.ok) {
      redirect("/error");
    }
  } else if (userType === "PJ") {
    // Get specific company datas --------------------------------------------------
    const brandName = formData.get("brand-name") as string;
    const legalName = formData.get("legal-name") as string;
    const cnpj = formData.get("cnpj") as string;
    const taxInfo = Number(formData.get("tax-info") as string);
    let ie = formData.get("ie") as string | null;

    // Brand name --------------------------------------------------
    if (!brandName) {
      invalidDatas.brandNameBlankError = true;
    }

    // Legal name --------------------------------------------------
    if (!legalName) {
      invalidDatas.legalNameBlankError = true;
    }

    // CPNJ --------------------------------------------------
    if (!cnpj) {
      invalidDatas.cnpjBlankError = true;
    } else {
      const doesCnpjExists = await fetch(
        "http://localhost:8000/api/auth/user/exists/cnpj",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cnpj: clearCnpjMask(cnpj) }),
        }
      );

      if (!doesCnpjExists.ok) {
        await doesCnpjExists.json().then((error) => {
          if (error.message === "CNPJ invalid")
            invalidDatas.cnpjInvalidError = true;
          if (error.message === "CNPJ exists")
            invalidDatas.cnpjExistError = true;
        });
      }
    }

    // Tax info --------------------------------------------------
    if (taxInfo !== 1 && taxInfo !== 2) {
      invalidDatas.taxInfoInvalidError = true;
    }

    if (taxInfo === 1) {
      if (!ie) {
        invalidDatas.ieBlankError = true;
      }
    }

    // SECURITY: in case user might try to manipulate HTML form through dev toolkit
    if (taxInfo === 2 && ie) {
      ie = null;
    }

    // Errors --------------------------------------------------
    const errors = searchForAnyErrors(invalidDatas);
    if (errors) return errors;

    // Fetch --------------------------------------------------
    const companyBody = {
      email,
      password,
      phone: clearPhoneMask(phone),
      brand_name: brandName,
      legal_name: legalName,
      name,
      cnpj: clearCnpjMask(cnpj),
      establishment_at: formatDate(date),
      tax_info: taxInfo,
      ie,
      allow_email_newsletter: allowEmailNewsletter,
      agreed_data_policies: agreedDataPolicies,
    };

    const companySignUpResponse = await fetchCompanySignUp(companyBody);

    if (!companySignUpResponse) {
      redirect("/error");
    }
  } else {
    throw new Error("Something went wrong");
  }

  revalidatePath("/", "layout");
  redirect("/");
};

export { signUpWithEmail };
