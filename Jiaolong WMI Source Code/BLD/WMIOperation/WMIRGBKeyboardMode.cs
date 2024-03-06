using System;

namespace JiaoLong16Pro.BLD.WMIOperation
{
	// Token: 0x0200000C RID: 12
	public enum WMIRGBKeyboardMode : byte
	{
		// Token: 0x04000053 RID: 83
		Mode_Off,
		// Token: 0x04000054 RID: 84
		Mode_RGBAutoCyclic,  //16PRO error
		// Token: 0x04000055 RID: 85
		Mode_RGBFixedMode,
		// Token: 0x04000056 RID: 86
		Mode_CustomColors, //16PRO error
		// Token: 0x04000057 RID: 87
		Unknow = 255
	}
}
