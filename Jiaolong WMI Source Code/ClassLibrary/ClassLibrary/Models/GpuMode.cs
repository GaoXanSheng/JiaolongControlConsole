using JiaoLong16Pro.BLD.WMIOperation;

namespace JiaoLong16Pro.Models;

public class GpuMode
{
    /**
     * 设定是否为独显直连
     */
    public static void SetGpuMode(WMIGPUMode mode)
    {
        WMIMethodServices.SetValue(WMIMethodName.GPUMode, mode);
    }
    public static void CLISetGpuMode(byte b)
    {
        if (b == 1)
        {
            WMIMethodServices.SetValue(WMIMethodName.GPUMode, WMIResultState.ON);
        }
        else if (b == 0)
        {
            WMIMethodServices.SetValue(WMIMethodName.GPUMode, WMIResultState.OFF);
        }
        else
        {
            WMIMethodServices.SetValue(WMIMethodName.GPUMode, WMIResultState.Unknow);
        }

    }
}