using JiaoLong16Pro.Models;
using JiaoLong16Pro.tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary
{
    public class Startup
    {
        [STAThread]
        public async Task<object> Invoke(string args)
        {
            if (args.Length < 1) return false;
            string[] data = args.Split('-');
            string type = data[0];
            string typeData = data[1];
            if (byte.TryParse(typeData, out byte result))
            {
                byte input = byte.Parse(typeData);
                switch (type)
                {
                    case "SetCpuLongPower":
                        CPUPower.SetCpuLongPower(input);
                        return true;
                    case "SetCpuShortPower":
                        CPUPower.SetCpuShortPower(input);
                        return true;
                    case "SetCPUTempWall":
                        CPUTempWall.SetCPUTempWall(input);
                        return true;
                    case "SetRGBKeyboardColor":
                        Keyboard.SetRGBKeyboardColor(byte.Parse(data[1]), byte.Parse(data[2]), byte.Parse(data[3]));
                        return true;
                    case "SetLogoLight":
                        LogoLight.CLISetLogoLight(input);
                        return true;
                    case "SetGpuMode":
                        GpuMode.CLISetGpuMode(input);
                        return true;
                    case "SetPerformaceMode":
                        PerformaceMode.CLISetPerformaceMode(input);
                        return true;
                    case "SetkeyboardLightBrightness":
                        Keyboard.SetkeyboardLightBrightness(input);
                        return true;
                    case "isAdmin":
                        return UacAdmin.isAdmin();
                    default:
                        return false;
                }

            }
            return false;

        }

    }
}
