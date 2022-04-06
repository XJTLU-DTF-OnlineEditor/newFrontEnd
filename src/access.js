/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser } = initialState || {};
  let canAdmin = false;
  let noAdmin = false;
  if (currentUser) {
    if (currentUser.currentAuthority === 'admin') {
      canAdmin = true;
    }else if (currentUser.currentAuthority === "user" || "guest") {
      noAdmin = true;
    }
  }
  return {
    canAdmin: canAdmin,
    noAdmin: noAdmin
  };
}
