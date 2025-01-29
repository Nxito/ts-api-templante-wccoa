import {
    WinccoaCtrlScript,
    WinccoaCtrlType,
} from 'winccoa-manager';
import winccoa from "../../helpers/globalWinccoaManager.js"
async function setManagerUserByName(user: string): Promise<boolean> {
    const wccoaScript = new WinccoaCtrlScript(
        winccoa,
        `int obtainUserId(string user)
        {
            return getUserId(user);
        }`
    );
    let userId = await wccoaScript.start(
        'obtainUserId',
        [user],
        [WinccoaCtrlType.string]
    );


    let userSetted = winccoa.setUserId(userId as number);
    winccoa.logInfo("result " + userSetted);
    return userSetted;

}
async function ctrlScriptAuth(user: string, pass: string) {
    // create instance of script with CTRL code to execute
    const authScript = new WinccoaCtrlScript(
        winccoa,
        ` bool auth(string user, string password)
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

        }`
    );

    try {
        // call the script with two parameters
        let result = await authScript.start(
            'auth',
            [user, pass],
            [WinccoaCtrlType.string, WinccoaCtrlType.string]
        );

        // show result
        return result
    } catch (exc) {
        console.error(exc);
    }
}
export { ctrlScriptAuth, setManagerUserByName }