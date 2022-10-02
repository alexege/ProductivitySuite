import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { notebook } from './notebook.module';
import { subject } from './subject.module';
import { category } from './category.module';
import { note } from './note.module';
import { comment } from './comment.module';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //These can stay empty, as we are instead using other modules instead of one global.
  },
  mutation: {
    //These can stay empty, as we are instead using other modules instead of one global.
  },
  actions:{
    //These can stay empty, as we are instead using other modules instead of one global.
  },
  modules: {
    auth,
    notebook,
    subject,
    category,
    note,
    comment
  }
});
