using System;
using System.Diagnostics;
using System.Management;
using System.Timers;

namespace JiaoLong16Pro.BLD.WMIOperation
{
	public enum EventLogEntryType
	{
		Error = 1,
		Warning = 2,
		Information = 4,
		SuccessAudit = 8,
		FailureAudit = 16,
	}
	// Token: 0x02000012 RID: 18
	public class WMIEventService
	{
		// Token: 0x14000001 RID: 1
		// (add) Token: 0x0600000B RID: 11 RVA: 0x00002368 File Offset: 0x00000568
		// (remove) Token: 0x0600000C RID: 12 RVA: 0x000023A0 File Offset: 0x000005A0
		public event WMIEventService.WMIEventArrivedEventHandler _WMIEventArrived;

		// Token: 0x0600000D RID: 13 RVA: 0x000023D8 File Offset: 0x000005D8
		public bool InitAndStart(WMIEventService.WMIEventArrivedEventHandler wMIEventArrived)
		{
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            bool result;
			try
			{
				string query = "SELECT * FROM HID_EVENT20";
				this._watcher = new ManagementEventWatcher("root\\WMI", query);
				Console.WriteLine("Waiting for an event...");
				this._watcher.EventArrived += this.Watcher_EventArrived;
				this._WMIEventArrived += wMIEventArrived;
				this._watcher.Start();
				result = true;
			}
			catch (ManagementException err)
			{
				Console.WriteLine("An error occurred while trying to receive an event: " + err.Message);
				result = false;
			}
			return result;
		}

		// Token: 0x0600000E RID: 14 RVA: 0x00002460 File Offset: 0x00000660
		protected void viewTimer(object sender, ElapsedEventArgs e)
		{
			byte[] outdata = new byte[8];
			outdata[0] = 1;
			outdata[1] = 15;
			outdata[2] = this.times;
			WMIEventType wMIEventType = (WMIEventType)outdata[0];
			WMIEventName wMIEventName = (WMIEventName)outdata[1];
			object eventValue;
			if (wMIEventName == WMIEventName.CPUFanSpeed || wMIEventName == WMIEventName.GPUFanSpeed)
			{
				eventValue = ((int)outdata[2] << 8) + (int)outdata[3];
			}
			else
			{
				eventValue = outdata[2];
			}
			Console.WriteLine("outdata:===============");
			for (int i = 0; i < outdata.Length; i++)
			{
				Console.WriteLine((int)outdata[i]);
			}
			if (this._WMIEventArrived != null)
			{
				this._WMIEventArrived(wMIEventType, wMIEventName, eventValue);
			}
			this.times += 1;
			if (this.times == 3)
			{
				this.times = 0;
			}
		}

		// Token: 0x0600000F RID: 15 RVA: 0x00002510 File Offset: 0x00000710
		public void Stop()
		{
			if (this._watcher != null)
			{
				this._watcher.Stop();
				this._watcher.Dispose();
			}
			this._watcher.EventArrived -= this.Watcher_EventArrived;
			this._watcher.Dispose();
		}

		// Token: 0x06000010 RID: 16 RVA: 0x00002560 File Offset: 0x00000760
		private void Watcher_EventArrived(object sender, EventArrivedEventArgs e)
		{
			Console.WriteLine(e.NewEvent);
			byte[] outdata = e.NewEvent["EventDetail"] as byte[];
			WMIEventType wMIEventType = (WMIEventType)outdata[0];
			WMIEventName wMIEventName = (WMIEventName)outdata[1];
			object eventValue;
			if (wMIEventName == WMIEventName.CPUFanSpeed || wMIEventName == WMIEventName.GPUFanSpeed)
			{
				eventValue = ((int)outdata[2] << 8) + (int)outdata[3];
			}
			else
			{
				eventValue = outdata[2];
			}
			if (this._WMIEventArrived != null)
			{
				this._WMIEventArrived(wMIEventType, wMIEventName, eventValue);
			}
			// EventLogHelper._EventLog.WriteEntry(BitConverter.ToString(outdata), EventLogEntryType.Information);
		}

		// Token: 0x0400006C RID: 108
		private ManagementEventWatcher _watcher;

		// Token: 0x0400006E RID: 110
		// private Timer _viewClock;

		// Token: 0x0400006F RID: 111
		private byte times;

		// Token: 0x02000031 RID: 49
		// (Invoke) Token: 0x0600012E RID: 302
		public delegate void WMIEventArrivedEventHandler(WMIEventType wMIEventType, WMIEventName wMIEventName, object eVENTvalue);
	}
}
