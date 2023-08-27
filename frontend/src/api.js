import axios from 'axios'
import { Alert } from './alerts'


const Error = () => {
    Alert("Action Failed", "Failed to execute this action", "error")
    console.log("??")
}
const Success = () => {
    Alert("Action Executed", "Action has been successfully executed!", "success")
    console.log("???")
}
const api = process.env.VUE_APP_API
let password = localStorage.getItem("password") || null


export const GetBasicGuilds = async function() {
    try {
        let response = await axios.get(api + "basic_info",{ headers: {password: password} })

        return response.data
    } catch(e) {
        //Make error dialogs
        if (e.response.status == 403) {
            let password = prompt("Please enter the password", "");
            localStorage.setItem("password", password)
            window.location.reload()
        }
        console.log(e)
        console.log(e)
        Error()
    }
    
}

export const DeleteChannel = async function(channelId) {
    try {
        let response = await axios.post(api + "delete_channel",{ channel_id: channelId},{ headers: {password: password} })
        if (!response.data) return
        Success()
    } catch(e) {
        //Make error dialogs
        console.log(e)
        Error()
    }
    
}

export const CreateChannel = async function(channelName, channelType, guildId) {
    try {
        let response = await axios.post(api + "create_channel",{ channel_name: channelName, channel_type: channelType, guild_id: guildId},{ headers: {password: password} })
        if (!response.data) return
        Success()
    } catch(e) {
        //Make error dialogs
        console.log(e)
        Error()
    }
    
}

export const KickMember = async function(memberId, guildId) {
    try {
        let response = await axios.post(api + "kick_member",{ member_id: memberId, guild_id: guildId},{ headers: {password: password} })
        if (!response.data) return
        Success()
    } catch(e) {
        //Make error dialogs
        console.log(e)
        Error()
    }
    
}

export const MemberRole = async function(memberId, guildId, roleId, roleAction) {
    try {
        let response = await axios.post(api + "member_role",{ member_id: memberId, guild_id: guildId, role_id: roleId, role_action: roleAction},{ headers: {password: password} })
        if (!response.data) return
        Success()
    } catch(e) {
        //Make error dialogs
        console.log(e)
        Error()

    }
    
}

export const SendMessage = async function(guildId, channelId, message) {
    try {
        let response = await axios.post(api + "send_message",{ guild_id: guildId, channel_id: channelId, message: message},{ headers: {password: password} })
        if (!response.data) return
        Success()
    } catch(e) {
        //Make error dialogs
        console.log(e)
        Error()

    }
    
}


export const RoleAction = async function(guildId, roleId, roleName, roleAction) {
    try {
        let response = await axios.post(api + "role",{ guild_id: guildId, role_id: roleId, role_name: roleName, role_action: roleAction},{ headers: {password: password} })
        if (!response.data) return
        Success()
    } catch(e) {
        //Make error dialogs
        console.log(e)
        Error()

    }
    
}