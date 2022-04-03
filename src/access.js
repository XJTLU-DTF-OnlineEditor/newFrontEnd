/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser } = initialState || {};
  let canAdmin = false;
  if (currentUser) {
    if (currentUser.currentAuthority === "admin") {
      canAdmin = true;
    }
  }
  return {
    canAdmin
    // canAdmin: currentUser && currentUser.currentAuthority === 'admin',
  };
}
