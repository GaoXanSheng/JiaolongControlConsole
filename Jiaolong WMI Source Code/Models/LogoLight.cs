using JiaoLong16Pro.BLD.WMIOperation;

namespace JiaoLong16Pro.Models;

public class LogoLight
{
    public static void SetLogoLight(WMIResultState m)
    {
        WMIMethodServices.SetValue(WMIMethodName.Ambientlight,m);
    }
    public static void CLISetLogoLight(byte b) {
        if (b == 1) {
            WMIMethodServices.SetValue(WMIMethodName.Ambientlight, WMIResultState.ON);
        }else if (b == 0)
        {
            WMIMethodServices.SetValue(WMIMethodName.Ambientlight, WMIResultState.OFF);
        }
        else
        {
            WMIMethodServices.SetValue(WMIMethodName.Ambientlight, WMIResultState.Unknow);
        }

    }
}