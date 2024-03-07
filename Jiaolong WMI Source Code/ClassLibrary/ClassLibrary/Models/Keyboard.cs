using JiaoLong16Pro.BLD.WMIOperation;
using JiaoLong16Pro.tools;
using System;

namespace JiaoLong16Pro.Models;

public class Keyboard
{
    /**
     * return float[] R G B
     */
    public static float[] GetRGBKeyboardColor()
    {
        Tuple<int, int, int> tuple = WMIMethodServices.GetValue<Tuple<int, int, int>>(WMIMethodName.RGBKeyboardColor);
        return ColorConversionHelper.RGB2HSB(new float[3]
        {
            (float)tuple.Item1,
            (float)tuple.Item2,
            (float)tuple.Item3
        });
    }

    public static void SetRGBKeyboardColor(byte red, byte green, byte blue)
    {
        WMIMethodServices.SetValue(WMIMethodName.RGBKeyboardMode, WMIRGBKeyboardMode.Mode_RGBFixedMode);
        WMIMethodServices.SetValue(WMIMethodName.RGBKeyboardColor, new byte[3]
        {
            red,
            green,
            blue
        });
    }
    public static void SetkeyboardLightBrightness(byte b)
    {
        if (b > 4)
        {
            WMIMethodServices.SetValue(WMIMethodName.RGBKeyboardBrightness, 4);
        }
        else if (b < 1)
        {
            WMIMethodServices.SetValue(WMIMethodName.RGBKeyboardBrightness, 0);
        }
        else
        {
            WMIMethodServices.SetValue(WMIMethodName.RGBKeyboardBrightness, b);
        }
    }
}