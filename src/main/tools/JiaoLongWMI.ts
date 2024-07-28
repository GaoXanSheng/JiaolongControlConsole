import { spawn } from 'child_process'

async function initWMI(path: string) {
  const process = spawn(path, [`Socket-9871-localhost`])
  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })

  process.on('close', (code) => {
    console.log(`子进程退出，退出码：${code}`)
  })
}

export default async (path: string) => {
  await initWMI(path)
}

