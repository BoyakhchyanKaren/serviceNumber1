async function removeItem (info:object){
  //@ts-ignore
  delete info?.password;
  return info;
};
export default removeItem;