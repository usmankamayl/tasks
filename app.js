const App = {
  data () {
    return {
      title: 'Notes',
      edit: false,
      id: '',
      input: {
        value: '',
        placeholder: 'Type ur note'
      },
      notes: [
        {
          name: "task 1",
          id: `task-${Math.random()}`
        },
        {
          name: "task 2",
          id: `task-${Math.random()}`
        },
        {
          name: "task 3",
          id: `task-${Math.random()}`
        },
    ],
      update: {
        value: '',
      },
    };
  },
  mounted () {
   this.getNotes();
  },
  watch: {
    notes: {
      handler(updateList) {
        localStorage.setItem('notes',JSON.stringify(updateList));
      },
      deep: true,
    }
  },

  methods: {
    getNotes () {
      const localNotes = localStorage.getItem('notes');
      if (localNotes) {
        this.notes = JSON.parse(localNotes);
      }
    },
    onSubmit() {
      const newTask={
        name: `${this.input.value}`,
        id: `task-${Math.random()}`
      };
      this.notes.push(newTask);
      console.log(localStorage.getItem('note'));
      this.input.value = '';
    },
    remove (index) {
      this.notes.splice(index, 1);
    },
    change(index) {
      this.edit = true;
      this.update.value = this.notes[index].name;
      this.id = this.notes[index].id;
  },
  updateTask() {
    const editedTask = {
      name:  this.update.value,
      id: this.id
    };
    this.notes.forEach(task => {
      if (task.id === editedTask.id) {
        const indexOfTask = this.notes.indexOf(task);
        this.notes.splice(indexOfTask, 1, editedTask);
      }
    });
     this.edit = false; 
  }
 }
}

Vue.createApp(App).mount('#app');
