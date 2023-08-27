<template>
    <div class="setting-group">
        <h3>Channel settings</h3>
        <div class="flex flex-column gap-2 mb-3">
            <label for="channel">Channel</label>
            <Dropdown filter v-model="selectedChannel" label="Channels" class="input" placeholder="Select a channel" :options="props.channels" optionValue="id" optionLabel="name"/>
            <small class="help">Channel that you want to delete</small>
        </div>
        
        <Button label="Delete" class="input mb-3" severity="danger" @click="deletech"/>


        <div class="flex flex-column gap-2 mb-3">
            <label for="name">Channel Name</label>
            <InputText placeholder="Channel name" class="input" v-model="newChannelName"/>
        </div>
        <SelectButton :options='["Channel", "Category"]' v-model="channelTypeSelect" class="mb-3"/>
        <Button label="Create" class="input mb-4" @click="newChannel"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { DeleteChannel, CreateChannel } from '@/api.js'


const selectedChannel = ref(null)

const newChannelName = ref("")
const channelTypeSelect = ref("Channel")
const props = defineProps({
    guildId: String,
    channels: Array,
    fetchBasic: Function
})

const deletech = async () => {
    if (!selectedChannel.value) return
    await DeleteChannel(selectedChannel.value)
    await props.fetchBasic()

}

const newChannel = async () => {
    await CreateChannel(newChannelName.value, channelTypeSelect.value, props.guildId)
    await props.fetchBasic()
}
</script>