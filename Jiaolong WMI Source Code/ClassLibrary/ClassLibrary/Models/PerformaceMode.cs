using JiaoLong16Pro.BLD.WMIOperation;

namespace JiaoLong16Pro.Models;

public class PerformaceMode
{
    public static void SetPerformaceMode(WMISystemPerMode mode)
    {
        WMIMethodServices.SetValue(WMIMethodName.SystemPerMode, mode);
    }
    public static void CLISetPerformaceMode(byte b)
    {
        if (b == 0)
        {
            SetPerformaceMode(WMISystemPerMode.BalanceMode);
        }
        else if (b == 1)
        {
            SetPerformaceMode(WMISystemPerMode.PerformanceMode);
        }
        else if (b == 2)
        {
            SetPerformaceMode(WMISystemPerMode.QuietMode);
        }
        else
        {
            SetPerformaceMode(WMISystemPerMode.Unknow);
        }

    }
}