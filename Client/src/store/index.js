import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { notebook } from './notebook.module';
import { subject } from './subject.module';
import { category } from './category.module';
import { note } from './note.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    notebook,
    subject,
    category,
    note
  }
});
