using System.Diagnostics;
using System.Security.Principal;

namespace JiaoLong16Pro.tools;

public class UacAdmin
{
    public static bool isAdmin()
    {
        // 检查当前用户是否为管理员
        WindowsIdentity identity = WindowsIdentity.GetCurrent();
        WindowsPrincipal principal = new WindowsPrincipal(identity);
        return principal.IsInRole(WindowsBuiltInRole.Administrator);
    }

    public static void UACRun()
    {
        if (!isAdmin())
        {
            // 如果当前用户不是管理员，则使用管理员权限重新启动应用程序
            string executablePath = Process.GetCurrentProcess().MainModule.FileName;
            ProcessStartInfo startInfo = new ProcessStartInfo(executablePath)
            {
                UseShellExecute = true,
                Verb = "runas" // 使用 "runas" 动词请求管理员权限
            };
            Process.Start(startInfo);
            // 退出当前实例
        }
    }
}