
class IPCRenderer {
    public async sendIPC(CMD: string):Promise<string> {
        return new Promise((resolve, reject)=>{
            console.log(CMD)
            const url = 'http://localhost:9871/';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: CMD
            }).then(response => response.text()).then(r=>{
                resolve(r)
            }).catch(e=>{
                reject(e)
            })
        })
    };
}

const IpcRenderer = new IPCRenderer()


export default IpcRenderer