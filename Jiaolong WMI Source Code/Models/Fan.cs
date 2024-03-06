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
    public static void SetFanSpeed(byte speed)
    {
        WMIMethodServices.SetValue(WMIMethodName.MaxFanSpeed,speed);
    }
}