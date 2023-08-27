<template>
    <div class="setting-group">
        <h3>Member settings</h3>
        
        <div class="flex flex-column gap-2 mb-3">
            <label for="member">Member</label>
            <Dropdown filter v-model="selectedMember" placeholder="Member" class="input" :options="props.members" optionValue="id" optionLabel="name"/>
            <small class="help">Member that you want to perform actions on</small>
        </div>
        <div class="member-buttons mb-3">
          <Button severity="warning" label="Kick" class="input" @click="kick"/>
        </div>

        <div class="flex flex-column gap-2 mb-3">
            <label for="role">Role</label>
            <Dropdown filter v-model="selectedRole" placeholder="Role" class="input" :options="props.roles" optionLabel="name" optionValue="id"/>
            <small class="help">Role that you want to remove/add</small>
        </div>
        
        <div class="member-buttons">
          <Button severity="danger" label="Remove" class="input" @click="roleActionRemove"/>
          <Button label="Add" class="input" @click="roleActionAdd"/>
        </div>
      </div>
</template>

<script setup>
import { ref } from 'vue';
import { KickMember, MemberRole } from '@/api.js'

const selectedMember = ref(null)
const selectedRole = ref(null)

const props = defineProps({
    guildId: String,
    members: Array,
    fetchBasic: Function,
    roles: Array
})

const kick = async () => {
    if (!selectedMember.value) return
    await KickMember(selectedMember.value, props.guildId)
    await props.fetchBasic()
}

const roleActionAdd = async () => {
    if (!selectedMember.value || !selectedRole.value) return
    await MemberRole(selectedMember.value, props.guildId, selectedRole.value, "add")
    await props.fetchBasic()
}
const roleActionRemove = async () => {
    if (!selectedMember.value || !selectedRole.value) return
    await MemberRole(selectedMember.value, props.guildId, selectedRole.value, "remove")
    await props.fetchBasic()
}
</script>