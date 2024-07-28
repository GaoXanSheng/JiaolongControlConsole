interface eventLoop {
  isRun:boolean
  eventLoop:any
  STC:number[][]
  LTC:number[][]
  TFS:number[][]
}



export default async function():Promise<eventLoop> {
  return {
    isRun: false,
    eventLoop: undefined,
    STC: [
      [35, 100], [45, 90], [55, 80], [65, 70], [75, 50], [85, 40], [95, 30], [100, 20], [110, 10], [120, 0]
    ],
    // Temperature long-term power consumption scheduling
    LTC: [
      [35, 100], [45, 90], [55, 80], [65, 70], [75, 50], [85, 40], [95, 30], [100, 20], [110, 10], [120, 0]
    ],
    // Temperature and speed
    TFS: [
      [3500, 60], [3600, 65], [3700, 70], [3800, 75], [4000, 80], [4500, 90], [4800, 95], [5000, 98], [5500, 99], [5800, 100]
    ]
  }
}
