<template>
    <div class="setting-group">
        <h3>Send Messages</h3>
        
        <div class="flex flex-column gap-2 mb-3">
            <label for="channel">Channel</label>
            <Dropdown filter v-model="selectedChannel" placeholder="Channels" class="input" :options="channels" optionValue="id" optionLabel="name"/>
            <small class="help">Channel that you want to send messages to</small>
        </div>
        <InputText class="input mb-3" placeholder="Message..." v-model="message"/>
        <Button label="Send" class="input" @click="send"/>
      </div>
</template>

<script setup>
import { ref } from 'vue'
import { SendMessage } from '@/api';

const props = defineProps({
    guildId: String,
    channels: Array,
    fetchBasic: Function,
})

const selectedChannel = ref(null)
const message = ref("")

const send = async () => {
    if (!selectedChannel.value || !message.value) return
    await SendMessage(props.guildId, selectedChannel.value, message.value)

}
</script>