<template>
  <div class="main" v-if="guilds">
    <Toast />
    <h1 class="text-center">S.S.S Cultist Dashboard</h1>
    <Fieldset legend="Guild Settings">
      <div class="card-wrap">
        <div class="flex flex-column gap-2 mb-3">
            <label for="guild">Guild</label>
            <Dropdown filter :options="guilds" optionLabel="name" optionValue="pos" v-model="selectedGuild" class="input"/>
            <small class="help">Guild to perform actions on</small>
        </div>


        <ChannelSettings :channels="guilds[selectedGuild].channels" :fetchBasic="fetchBasic" :guildId="guilds[selectedGuild].guild_id"/>
        <RoleSettings :roles="guilds[selectedGuild].roles" :fetchBasic="fetchBasic" :guildId="guilds[selectedGuild].guild_id"/>
        <MemberSettings :roles="guilds[selectedGuild].roles" :members="guilds[selectedGuild].members" :fetchBasic="fetchBasic" :guildId="guilds[selectedGuild].guild_id"/>
        <SendMessages :channels="guilds[selectedGuild].channels" :fetchBasic="fetchBasic" :guildId="guilds[selectedGuild].guild_id"/>
      </div>
    </Fieldset>
</div>
</template>

<script setup>
import ChannelSettings from '@/components/ChannelSettings.vue'
import MemberSettings from './components/MemberSettings.vue';
import RoleSettings from './components/RoleSettings.vue';
import { ref, onMounted } from 'vue';
import SendMessages from './components/SendMessages.vue';
import { GetBasicGuilds } from './api.js'
import { emitter } from './emitter'
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const guilds = ref(null)
const selectedGuild = ref(0)
const channelTypeSelect = ref("Channel")

onMounted(async () => {
  await fetchBasic()
})

const fetchBasic = async () => {
  let data = await GetBasicGuilds()
  guilds.value = data
}


emitter.on("alert", (data) => {
  if (data.life === undefined) data.life = 5000
  toast.add({ severity: data.severity, summary: data.summary, detail: data.message, life: data.life });
});
</script>

<style>
body {
  background: var(--surface-ground);
  font-family: var(--font-family);
}
.main {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

}
.card-wrap {
  display: flex;
  flex-direction: column;
}
.input {
  width: 100%;
  max-width: 350px;
}
.member-buttons {
  width: 100%;
  max-width: 350px;
  display: flex;
  gap: 16px;
}
.help {
    opacity: 0.5;
}


.setting-group {
  width: 400px;
  margin-bottom: 2em;
}

@media (max-width: 500px) {
  .setting-group {
    width: auto;
  }
}
</style>
