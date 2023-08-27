import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue'
//theme
import "primevue/resources/themes/viva-dark/theme.css";
import "primeflex/primeflex.css"

import Toast from 'primevue/toast';
import Button from "primevue/button"
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import SelectButton from 'primevue/selectbutton';
import Divider from 'primevue/divider';
import AutoComplete from 'primevue/autocomplete';


import ToastService from 'primevue/toastservice';
import { emitter } from "./emitter";


const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.use(PrimeVue);
app.use(ToastService);

app.component("Button", Button)
app.component("Fieldset", Fieldset)
app.component("InputText", InputText)
app.component("Dropdown", Dropdown)
app.component("SelectButton", SelectButton)
app.component("Divider", Divider)
app.component("Toast", Toast)
app.component("AutoComplete", AutoComplete)
app.mount("#app")

