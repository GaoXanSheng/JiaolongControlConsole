using JiaoLong16Pro.BLD.WMIOperation;

namespace JiaoLong16Pro.Models;

public class CPUPower
{
    /**
     * 低负载电压
     */
    public static void SetCpuShortPower(byte LongPower)
    {
        WMIMethodServices.SetValue(WMIMethodName.CPUPower, new byte[2]
        {
            (byte) WMICPUPower.SPLState,
            LongPower
        });

    }
    /**
     * 全核心满载电压
     */
    public static void SetCpuLongPower(byte ShortPower)
    {
        WMIMethodServices.SetValue(WMIMethodName.CPUPower, new byte[2]
        {
            (byte) WMICPUPower.SPPTState,
            ShortPower
        });
    }
}