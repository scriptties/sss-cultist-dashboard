<template>
    <div class="setting-group">
        <h3>Role Settings</h3>
        
        <div class="flex flex-column gap-2 mb-3">
            <label for="role">Role</label>
            <Dropdown filter v-model="selectedRole" placeholder="Role" class="input" :options="props.roles" optionValue="id" optionLabel="name"/>
            <small class="help">Role that you want to delete</small>
        </div>
        <Button label="Delete" class="input mb-3" severity="danger" @click="deleteRole"/>

        <div class="flex flex-column gap-2 mb-3">
            <label for="name">Role Name</label>
            <InputText placeholder="Role name" class="input" v-model="newRoleName"/>
        </div>
        <Button label="Create" class="input mb-4" @click="createRole"/>
      </div>
</template>

<script setup>
import { ref } from 'vue'
import { RoleAction } from '@/api';

const props = defineProps({
    guildId: String,
    roles: Array,
    fetchBasic: Function,
})

const selectedRole = ref(null)
const newRoleName = ref("")

const deleteRole = async () => {
    if (!selectedRole.value) return
    await RoleAction(props.guildId, selectedRole.value, null, "delete")
    await props.fetchBasic()
}

const createRole = async() => {
    if (!newRoleName.value) return
    await RoleAction(props.guildId, 0, newRoleName.value, "create")
    await props.fetchBasic()
}
</script>