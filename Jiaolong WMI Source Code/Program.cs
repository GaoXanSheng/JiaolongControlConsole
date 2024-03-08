﻿using System.Diagnostics;
using System.Reflection;
using System.Security.Principal;
using JiaoLong16Pro.BLD.WMIOperation;
using JiaoLong16Pro.Models;
using JiaoLong16Pro.tools;


namespace JiaoLong16Pro
{
    internal static class Program
    {
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main(string[] args)
        {
            if (args.Length == 0) exit();
            string[] data = args[0].Split("-");
            string type = data[0];
            string typeData = data[1];
            if (byte.TryParse(typeData, out byte result))
            {
                byte input = byte.Parse(typeData);
                switch (type)
                {
                    case "SetCpuLongPower":
                        //SetCpuLongPower-number
                        CPUPower.SetCpuLongPower(input);
                        Console.WriteLine(true);
                        break;
                    case "SetCpuShortPower":
                        //SetCpuShortPower-number
                        CPUPower.SetCpuShortPower(input);
                        Console.WriteLine(true);
                        break;
                    case "SetCPUTempWall":
                        //SetCPUTempWall-number
                        CPUTempWall.SetCPUTempWall(input);
                        Console.WriteLine(true);
                        break;
                    case "SetRGBKeyboardColor":
                        //SetRGBKeyboardColor-R-G-B
                        Keyboard.SetRGBKeyboardColor(byte.Parse(data[1]), byte.Parse(data[2]), byte.Parse(data[3]));
                        Console.WriteLine(true);
                        break;
                    case "SetLogoLight":
                        //SetLogoLight-1
                        LogoLight.CLISetLogoLight(input);
                        Console.WriteLine(true);
                        break;
                    case "SetGpuMode":
                        //SetGpuMode-1
                        GpuMode.CLISetGpuMode(input);
                        Console.WriteLine(true);
                        break;
                    case "SetPerformaceMode":
                        //SetPerformaceMode-1
                        PerformaceMode.CLISetPerformaceMode(input);
                        Console.WriteLine(true);
                        break;
                    case "SetkeyboardLightBrightness":
                        //SetkeyboardLightBrightness-1
                        Keyboard.SetkeyboardLightBrightness(input);
                        Console.WriteLine(true);
                        break;
                    case "isAdmin":
                        //isAdmin-1
                        Console.WriteLine(UacAdmin.isAdmin());
                        break;
                    default:
                        exit();
                        break; // 可选，因为在 default 分支已经使用了 exit() 函数
                }
            }

            else
            {
                exit();
            }
        }

        static void exit()
        {
            Console.WriteLine(false);
            Environment.Exit(0);
        }
    }
}