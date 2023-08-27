import { emitter } from './emitter'


export const Alert = function (summary, message, severity) {

    emitter.emit("alert", {summary: summary, message: message, severity: severity})
}
