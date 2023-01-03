/* eslint-disable*/
export const checkFieldType = (type, typeList) => {
  if (typeList.includes(type)) {
    return true;
  }
  return false;
};

export const passwordValidator = (value) => {
  const pattern = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,}$");
  const isPasswordValid = pattern.test(value);
  const errMsg = "The password must have at least 6 characters and contain 1 special character, 1 alphabet and 1 number.";
  if(!isPasswordValid || value.length < 6) return errMsg;
  return null
}

export const emailValidator = (value) => {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmailValid = pattern.test(value);
  const errMsg = "Invalid email";
  if(!isEmailValid) return errMsg;
  return null
}

export const onChangeInput = (e, formData, setFormData) => {
  const { name, value } = e.target;
  if (name === 'mobile' && value.length > 10) return
  setFormData({ ...formData, [name]: value })
}

export const mapStates = (states) => {
  const result = states?.reduce(function (r, a) {
    r[a?.state] = r[a?.state] || [];
    r[a?.state].push(a);
    return r;
}, Object.create(null));
  return result;
}

export const mapCities = (states, selectedState) => {
  return mapStates(states)[selectedState]?.map((item) => {
    return {
      id: item?.id,
      value: item?.name
    }
  });
}

export const compareArrays = (a, b) =>
  a?.length == b?.length && a?.every((element, index) => element == b[index]);