using JiaoLong16Pro.BLD.WMIOperation;
using System;

namespace JiaoLong16Pro.Models;

public class CPUTempWall
{
    /**
     * 设置CPU温度墙
     */
    public static void SetCPUTempWall(byte inputCPUPower)
    {
        WMIMethodServices.SetValue(WMIMethodName.CPUPower, new byte[2]
        {
            (byte)WMICPUPower.CPUTempWallState,
            inputCPUPower
        });
    }
    public static float GetCPUTempWall()
    {
      return  (float) WMIMethodServices.GetValue<Tuple<int>>(WMIMethodName.SystemPerMode).Item1;
    }
}