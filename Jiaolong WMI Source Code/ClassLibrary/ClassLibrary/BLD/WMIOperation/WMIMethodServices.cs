using System;
using System.Management;

namespace JiaoLong16Pro.BLD.WMIOperation
{
	// Token: 0x02000011 RID: 17
	public static class WMIMethodServices
	{
		// Token: 0x06000005 RID: 5 RVA: 0x00002090 File Offset: 0x00000290
		private static void PrintByteArray(byte[] data)
		{
			for (int i = 0; i < 8; i++)
			{
				Console.WriteLine("{0:X}", data[i]);
			}
		}

		// Token: 0x06000006 RID: 6 RVA: 0x000020BC File Offset: 0x000002BC
		private static byte[] _MakeMethodPrams(WMIMethodType wMIMethodType, WMIMethodName wMIMethodName)
		{
			byte[] prams = new byte[32];
			for (int i = 0; i < prams.Length; i++)
			{
				prams[i] = 0;
			}
			prams[1] = (byte)wMIMethodType;
			prams[3] = (byte)wMIMethodName;
			return prams;
		}

		// Token: 0x06000007 RID: 7 RVA: 0x000020F0 File Offset: 0x000002F0
		public static T GetValue<T>(WMIMethodName wMIMethodName)
		{
			Tuple<bool, byte[]> tuple = WMIMethodServices.ExcMethod(WMIMethodServices._MakeMethodPrams(WMIMethodType.Get, wMIMethodName));
			if (!tuple.Item1)
			{
				if (typeof(T) == typeof(Tuple<int, int>))
				{
					return (T)((object)new Tuple<int, int>(-1, -1));
				}
				if (typeof(T) == typeof(Tuple<int, int, int>))
				{
					return (T)((object)new Tuple<int, int, int>(-1, -1, -1));
				}
				return (T)((object)byte.MaxValue);
			}
			else
			{
				// WMIMethodServices.PrintByteArray(tuple.Item2);
				if (typeof(T) == typeof(Tuple<int, int>))
				{
					int item = ((int)tuple.Item2[5] << 8) + (int)tuple.Item2[4];
					int gpufanspeed = ((int)tuple.Item2[7] << 8) + (int)tuple.Item2[6];
					return (T)((object)new Tuple<int, int>(item, gpufanspeed));
				}
				if (typeof(T) == typeof(Tuple<int, int, int>))
				{
					int item2 = (int)tuple.Item2[4];
					int RGBKeyboardColor_G = (int)tuple.Item2[5];
					int RGBKeyboardColor_B = (int)tuple.Item2[6];
					return (T)((object)new Tuple<int, int, int>(item2, RGBKeyboardColor_G, RGBKeyboardColor_B));
				}
				return (T)((object)tuple.Item2[4]);
			}
		}

		// Token: 0x06000008 RID: 8 RVA: 0x00002224 File Offset: 0x00000424
		public static bool SetValue(WMIMethodName wMIMethodName, object setvalue)
		{
			bool ret = true;
			byte[] array = WMIMethodServices._MakeMethodPrams(WMIMethodType.Set, wMIMethodName);
			array[4] = (byte)setvalue;
			// Console.WriteLine("SetMethod inparms:");
			// WMIMethodServices.PrintByteArray(array);
			if (!WMIMethodServices.ExcMethod(array).Item1)
			{
				ret = false;
			}
			return ret;
		}

		// Token: 0x06000009 RID: 9 RVA: 0x00002268 File Offset: 0x00000468
		public static bool SetValue(WMIMethodName wMIMethodName, byte[] setvalue)
		{
			bool ret = true;
			byte[] inparms = WMIMethodServices._MakeMethodPrams(WMIMethodType.Set, wMIMethodName);
			for (int i = 0; i < setvalue.Length; i++)
			{
				inparms[4 + i] = setvalue[i];
			}
			// Console.WriteLine("SetMethod inparms:");
			// WMIMethodServices.PrintByteArray(inparms);
			if (!WMIMethodServices.ExcMethod(inparms).Item1)
			{
				ret = false;
			}
			return ret;
		}

		// Token: 0x0600000A RID: 10 RVA: 0x000022BC File Offset: 0x000004BC
		public static Tuple<bool, byte[]> ExcMethod(byte[] inData)
		{
            Console.OutputEncoding = System.Text.Encoding.UTF8;

            if (inData == null)
			{
				return new Tuple<bool, byte[]>(false, null);
			}
			if (inData.Length != 32)
			{
				return new Tuple<bool, byte[]>(false, null);
			}
			// WMIMethodServices.PrintByteArray(inData);
			Tuple<bool, byte[]> result;
			try
			{
				ManagementObject managementObject = new ManagementObject("root\\WMI", "MICommonInterface.InstanceName='ACPI\\PNP0C14\\MIFS_0'", null);
				ManagementBaseObject inParams = managementObject.GetMethodParameters("MiInterface");
				inParams["InData"] = inData;
				byte[] outData = managementObject.InvokeMethod("MiInterface", inParams, null)["OutData"] as byte[];
				result = new Tuple<bool, byte[]>(true, outData);
			}
			catch (ManagementException err)
			{
				Console.WriteLine("An error occurred while trying to execute the WMI method: " + err.Message);
				result = new Tuple<bool, byte[]>(false, null);
			}
			return result;
		}
	}
}
