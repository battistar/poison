export const toURLParams = (str: string): string => {
  return str.toLowerCase().replaceAll(" ", "_").replaceAll("/", "-");
}

export const fromURLParams = (param: string): string => {
  const str = param.replaceAll("_", " ").replaceAll("-", "/");

  const splittedStr = str.split(' ');
  for (var i = 0; i < splittedStr.length; i++) {
    splittedStr[i] = splittedStr[i].charAt(0).toUpperCase() + splittedStr[i].substring(1);     
  }

  return splittedStr.join(' ');
}