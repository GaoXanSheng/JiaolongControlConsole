using System;

namespace JiaoLong16Pro.BLD.WMIOperation
{
	// Token: 0x02000010 RID: 16
	public enum WMICPUPower : byte
	{
		// Token: 0x04000066 RID: 102
		CloseState =0,
		// Token: 0x04000067 RID: 103
		OpenState,
		// Token: 0x04000068 RID: 104
		SPLState,
		// Token: 0x04000069 RID: 105
		SPPTState,
		// Token: 0x0400006A RID: 106
		CPUTempWallState,
		// Token: 0x0400006B RID: 107
		Unknow = 255
	}
}
