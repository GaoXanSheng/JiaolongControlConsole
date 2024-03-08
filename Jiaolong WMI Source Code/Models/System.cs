using JiaoLong16Pro.BLD.WMIOperation;
using System.Runtime.InteropServices;

namespace JiaoLong16Pro.Models;

public class System
{
    public static void OpenCustomMode()
    {
        WMIMethodServices.SetValue(WMIMethodName.CPUPower, WMICPUPower.OpenState);
    }
    public static WMISystemACType GetACType()
    {
        return WMIMethodServices.GetValue<WMISystemACType>(WMIMethodName.SystemAcType);
    }

    private enum ACLineStatus : byte
    {
        Offline = 0,
        Online = 1,
        Unknown = 255,
    }
    private enum BatteryFlag : byte
    {
        High = 1,
        Low = 2,
        Critical = 4,
        Charging = 8,
        NoSystemBattery = 128, 
        Unknown = 255, 
    }
    private struct SystemPowerStatus
    {
        public ACLineStatus LineStatus;
        public BatteryFlag flgBattery;
        public byte BatteryLifePercent;
        public byte Reserved1;
        public int BatteryLifeTime;
        public int BatteryFullLifeTime;
    }
    [DllImport("kernel32.dll", SetLastError = true)]
    private static extern bool GetSystemPowerStatus(out SystemPowerStatus sps);

}