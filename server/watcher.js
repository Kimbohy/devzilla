import {exec, spawn} from 'node:child_process'
import { watch } from 'node:fs/promises'

const [node, _, file] = process.argv

function spawnNode () {

    const command = spawn(node, [file])

    command.stdout.pipe(process.stdout)
    command.stderr.pipe(process.stderr)

    command.on('close', (code) => {
        if (code !== null) {
            process.exit(code)
        }
    })

    return command

}


let ChildProcessSpawn = spawnNode()
const watcher = watch('./', {recursive: true})
for await (const event of watcher) {
    if (event.filename.endsWith('.js')) {
        ChildProcessSpawn.kill('SIGKILL')
        ChildProcessSpawn = spawnNode()
    }
}