using System;

namespace JiaoLong16Pro.tools;

public class ColorConversionHelper
{
    public static float[] HSB2RGB(float[] hsb)
    {
        if ((double)hsb[0] == 360.0)
            hsb[0] = 0.0f;
        float[] numArray = new float[3];
        float num1 = 0.0f;
        float num2 = 0.0f;
        float num3 = 0.0f;
        if ((double)hsb[1] == 0.0)
        {
            double num4;
            num3 = (float)(num4 = (double)hsb[2]);
            num2 = (float)num4;
            num1 = (float)num4;
        }
        else
        {
            double num5;
            int num6 = (int)Math.Floor(num5 = (double)hsb[0] / 60.0);
            double num7 = (double)num6;
            float num8 = (float)(num5 - num7);
            float num9 = hsb[2] * (1f - hsb[1]);
            float num10 = hsb[2] * (float)(1.0 - (double)hsb[1] * (double)num8);
            float num11 = hsb[2] * (float)(1.0 - (double)hsb[1] * (1.0 - (double)num8));
            switch (num6)
            {
                case 0:
                    num1 = hsb[2];
                    num2 = num11;
                    num3 = num9;
                    break;
                case 1:
                    num1 = num10;
                    num2 = hsb[2];
                    num3 = num9;
                    break;
                case 2:
                    num1 = num9;
                    num2 = hsb[2];
                    num3 = num11;
                    break;
                case 3:
                    num1 = num9;
                    num2 = num10;
                    num3 = hsb[2];
                    break;
                case 4:
                    num1 = num11;
                    num2 = num9;
                    num3 = hsb[2];
                    break;
                case 5:
                    num1 = hsb[2];
                    num2 = num9;
                    num3 = num10;
                    break;
            }
        }

        return new float[3]
        {
            num1 * (float)byte.MaxValue,
            num2 * (float)byte.MaxValue,
            num3 * (float)byte.MaxValue
        };
    }

    public static float[] RGB2HSB(float[] rgb)
    {
        float[] numArray = new float[3];
        float val1_1 = rgb[0];
        float val1_2 = rgb[1];
        float val2 = rgb[2];
        float num1 = Math.Max(val1_1, Math.Max(val1_2, val2));
        if ((double)num1 <= 0.0)
            return numArray;
        float num2 = Math.Min(val1_1, Math.Min(val1_2, val2));
        float num3 = num1 - num2;
        if ((double)num1 > (double)num2)
        {
            numArray[0] = (double)val1_2 != (double)num1
                ? ((double)val2 != (double)num1
                    ? ((double)val2 <= (double)val1_2
                        ? (float)(((double)val1_2 - (double)val2) / (double)num3 * 60.0)
                        : (float)(((double)val1_2 - (double)val2) / (double)num3 * 60.0 + 360.0))
                    : (float)(((double)val1_1 - (double)val1_2) / (double)num3 * 60.0 + 240.0))
                : (float)(((double)val2 - (double)val1_1) / (double)num3 * 60.0 + 120.0);
            if ((double)numArray[0] < 0.0)
                numArray[0] = numArray[0] + 360f;
        }
        else
            numArray[0] = 0.0f;

        numArray[1] = num3 / num1;
        numArray[2] = num1 / (float)byte.MaxValue;
        return numArray;
    }
}