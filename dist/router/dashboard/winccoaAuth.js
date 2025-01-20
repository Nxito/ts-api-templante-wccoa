import { WinccoaCtrlScript, WinccoaCtrlType, WinccoaManager, } from 'winccoa-manager';
const winccoa = new WinccoaManager();
async function ctrlScriptAuth(user, pass) {
    // create instance of script with CTRL code to execute
    const authScript = new WinccoaCtrlScript(winccoa, ` bool auth(string user, string password)
{
  int userid =  getUserId(user);
  bool success;
  success = checkPassword(userid, password);
  DebugN("User "+user+" specified password is correct?", success);

  if (success)
  {
    DebugN("Autenticación exitosa. User : ${user}");
    return true;
    }
  else
  {
    DebugN("Error en la autenticación de ${user}:");
    return false;
    }

}`);
    try {
        // call the script with two parameters
        let result = await authScript.start('auth', [user, pass], [WinccoaCtrlType.string, WinccoaCtrlType.string]);
        // show result
        //console.warn(types);
        return result;
    }
    catch (exc) {
        console.error(exc);
    }
}
export default ctrlScriptAuth;
