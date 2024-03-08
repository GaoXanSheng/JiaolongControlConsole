using JiaoLong16Pro.BLD.WMIOperation;
namespace JiaoLong16Pro.Models;

public class Fan
{
    /**
     * 切换BIOS接管运行
     */
    public static void SwitchMaxFanSpeed(WMIResultState m)
    {
        WMIMethodServices.SetValue(WMIMethodName.MaxFanSpeedSwitch,m);
    }
    public static void CLISetSwitchMaxFanSpeed(byte b)
    {
        if (b == 1)
        {
            SwitchMaxFanSpeed(WMIResultState.ON);
        }
        else if (b == 0)
        {
            SwitchMaxFanSpeed(WMIResultState.OFF);
        }
        else
        {
            SwitchMaxFanSpeed(WMIResultState.OFF);
        }

    }
    public static void SetFanSpeed(byte speed)
    {
        WMIMethodServices.SetValue(WMIMethodName.MaxFanSpeed,speed);
    }
}