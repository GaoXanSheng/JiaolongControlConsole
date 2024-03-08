using System;
using System.Diagnostics;

namespace JiaoLong16Pro.BLD.WMIOperation
{
	// Token: 0x02000013 RID: 19
	public static class EventLogHelper
	{
		// Token: 0x17000001 RID: 1
		// (get) Token: 0x06000012 RID: 18 RVA: 0x000025EB File Offset: 0x000007EB
		public static EventLog _EventLog
		{
			get
			{
				EventLogHelper.log.Source = "OSDEvents";
				return EventLogHelper.log;
			}
		}

		// Token: 0x04000070 RID: 112
		private static EventLog log = new EventLog();
	}
}
