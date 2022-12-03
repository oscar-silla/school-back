export const checkObjectId = (id: string): boolean => {
  const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  if (checkForHexRegExp.test(id)) {
    return true;
  } else {
    return false;
  }
};
