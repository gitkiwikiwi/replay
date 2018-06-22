<template>

  <!-- SOME  -->
  <div class="hello">

    <div class="container">
      <div class="row">
        
        <!-- <Modal for creating task -->
        <md-dialog class="modal-main" :md-active.sync="createTaskModal">
          <md-dialog-title>Create New Task</md-dialog-title>
          <md-dialog-content>

            <md-field>
              <label for="project">Enter task name</label>
              <md-input v-model="taskName" aria-placeholder="name" name="project" id="project" />
            </md-field>

            <div>
              <label :class="{on:status==='Complete', off:status==='Incomplete'}" for="encryptionStatus">Status:</label>
                <!-- On of toggle button start -->
                <toggle-button :value="false" 
                @change="changeStatus"
                color="rgb(52, 154, 129)" 
                :sync="true"
                style="margin-bottom:6px" 
                :labels="{checked: 'on', unchecked: 'Off'}"/>
                <!-- toggle button ends -->
                <span>{{status}}</span>
              </div>
             
          </md-dialog-content>
          <md-dialog-actions>
            <md-button @click="createTask" class="btn btn-default btn-modal confirm" :disabled="!taskName" type="submit">Create</md-button>
            <md-button @click="createTaskModal = false" class="btn btn-default btn-modal cancel " type="cancel">Cancel</md-button>
          </md-dialog-actions>

        </md-dialog>
        <!-- Modal for creating task ends -->

        <!-- Modal for editing task  -->
        <md-dialog class="modal-main" :md-active.sync="editTaskModal">
          <md-dialog-title>Edit task</md-dialog-title>
          <md-dialog-content>

            <md-field>
              <label for="project">Edit task name</label>
              <md-input v-model="taskName" aria-placeholder="name" name="project" id="project" />
            </md-field>

            <div>
              <label :class="{on:status==='Complete', off:status==='Incomplete'}" for="encryptionStatus">Status:</label>
                <!-- On of toggle button start -->
                <toggle-button :value="complete" 
                @change="changeStatus"
                color="rgb(52, 154, 129)" 
                :sync="true"
                style="margin-bottom:6px" 
                :labels="{checked: 'on', unchecked: 'Off'}"/>
                <!-- toggle button ends -->
                <span>{{status}}</span>
              </div>
             
          </md-dialog-content>
          <md-dialog-actions>
            <md-button @click="updateTask" class="btn btn-default btn-modal confirm" :disabled="!taskName" type="submit">Update</md-button>
            <md-button @click="editTaskModal = false" class="btn btn-default btn-modal cancel " type="cancel">Cancel</md-button>
          </md-dialog-actions>

        </md-dialog>
        <!-- Modal for editing task ends -->

        <!-- Modal for creating project -->
        <md-dialog class="modal-main" :md-active.sync="createProjectModal">
          <md-dialog-title>Upload New Video</md-dialog-title>
          <md-dialog-content>

            <md-field>
              <label for="project">Video Title</label>
                <md-input v-model="project" aria-placeholder="name" name="project" id="project" />
            </md-field>
            <md-input type="file" @change="onFileChange" />
            <div>
              <label :class="{private:encryptionStatus==='Private', public:encryptionStatus==='Public'}" for="encryptionStatus">Encryption:</label>
                <!-- On of toggle button start -->
                <toggle-button :value="false" 
                @change="changeEncryption"
                color="rgb(52, 154, 129)" 
                :sync="true"
                style="margin-bottom:6px" 
                :labels="{checked: 'on', unchecked: 'Off'}"/>
                <!-- toggle button ends -->
                <span>{{encryptionStatus}}</span>
            </div>

             
          </md-dialog-content>
          <md-dialog-actions>
            <md-button @click="addProject" class="btn btn-default btn-modal confirm" :disabled="! project" type="submit">Upload</md-button>
            <md-button @click="createProjectModal=false" class="btn btn-default btn-modal cancel " type="cancel">Cancel</md-button>
          </md-dialog-actions>

        </md-dialog>
        <!-- Modal for creating project ends -->

        <div class="col-md-8 col-md-offset-2">
        <small><span class="sign-out"> (<a class="" href="#" @click.prevent="signOut">Sign Out</a>)</span></small>

         <h1 class="page-header">Replay
            <md-avatar class="md-avatar-icon md-medium pull-right">
              <img :src="user.avatarUrl() ? user.avatarUrl() : '/avatar-placeholder.png'" class="avatar">
            </md-avatar>
                  
          <!-- Button for creating project -->
          <button @click="project = ''; createProjectModal = true" class=" btn btn-default landing pull-right mt-10"><md-icon style="font-size:10px">add</md-icon>Upload Video</button>

        </h1>
        <vue-tabs>
            <v-tab title="Feed">
            <h2 class="feed-info">
                <small class="pull-right">
                {{ user.username ? user.username : user.identityAddress }}
                </small>
            </h2>
              Feed
            </v-tab>

            <v-tab title="Explorer">
            <h2 class="explorer-info">
                <small class="pull-right">
                {{ user.username ? user.username : user.identityAddress }}
                </small>
            </h2>
              Explorer
            </v-tab>

            <v-tab title="My Channel" icon="ti-user">
            <h2 class="user-info">
                <small class="pull-right">
                {{ user.username ? user.username : user.identityAddress }}
                </small>
            </h2>
                {{ user.name() ? user.name() : 'Nameless Person'}}'s Channel
            <!-- Projects listing -->
              <div class="list-group pt15">
                <draggable v-model="projects" @change="handleChange('PROJECT', {projects})">
                <div v-for="project in projects"
                  class="list-group-item"
                  :class="{completed: project.completed}"
                  :key="project.id">
                  <label>
                    {{ project.text }}
                  </label>
                  <button v-clipboard:copy="hubUrl + project.id + '.json'" class="btn btn-default bb2 pl0 ml15 list" href="#"><md-icon class="fs14-ni">file_copy</md-icon>Copy Path</button>
                  <button @click.prevent="addTask(project)" class="btn btn-default bb2 pl0  list" href="#"><md-icon class="fs14-ni">add</md-icon>Add Task</button>
                  <a @click.prevent="projects.splice(projects.indexOf(project), 1), updateProjectList(projects)" class="delete pull-right" href="#">Remove Project</a>
                  <!-- Task list for project -->

                    <div v-for="(tasks, index) in taskArray" v-if="tasks.id == project.id" :key='index' >
                      <draggable v-model="tasks.tasks" @change="handleChange('TASK', {taskid:tasks.id, tasks: tasks.tasks, project: project})">
                        <div :class="{completed: task.complete}" class="list-group-item task task-modal-font" v-for="(task, index) in tasks.tasks" :key="index">
                          <label>
                            {{task.name}}
                          </label>
                          <a @click.prevent="deleteTask(index, project)" class="delete dlt task-btn pull-right" href="#">Delete</a>
                          <a @click.prevent="editTask(task,index, project)" class="edit task-btn delete pull-right" href="#">Edit</a>
                        </div>
                      </draggable>
                    </div>
                  <!-- Task list ends -->
                </div>
                </draggable>
              </div>
              <!-- Project list ends -->
            </v-tab>
        </vue-tabs>
            

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// We are maintaining arrays for every project file,
// so that user can see the task and project lists updated in real time,
// we can stop maintaining local arrays but then for every new task/project or deleted task/project,
// we need to send a fetch request everytime. that makes the UI a little slow
import draggable from 'vuedraggable'

var STORAGE_FILE = 'projects.json'

export default {
  name: 'dashboard',
  props: ['user'],
  components: {
    draggable
  },
  data () {
    return {
      blockstack: window.blockstack,
      projects: [],
      taskArray: [],
      project: '',
      taskName: '',
      createProjectModal: false,
      createTaskModal: false,
      editTaskModal: false,
      selectedProject: {},
      status: 'Incomplete',
      encryptionStatus: 'Public',
      hubUrl: '',
      encryptOption: {
        encrypt: true
      },
      decryptOption: {
        decrypt: true
      },
      complete: false
    }
  },
  mounted () {
    // Function to fetch projects file containing list of projects
    this.fetchProjectFile()
  },
  methods: {
    handleChange (type, info) {
      if (type === 'PROJECT') {
        this.blockstack.putFile(STORAGE_FILE, JSON.stringify(info.projects))
        console.log('PROJECT UPDATE SUCCESS')
      } else {
        let fileName = info.project.id + '.json'
        this[info.project.id].tasks = [...info.tasks]
        this.blockstack.putFile(fileName, JSON.stringify(this[info.project.id]))
      }
    },
    // Method for creating new task
    createTask (task) {
      this.createTaskModal = false
      let projectFileName = this.selectedProject.id // using current selected project name for creating new unique file
      this[projectFileName]['manager'] = this.user.username // entering manager name in project file
      this[projectFileName]['tasks'].unshift(
        {
          name: this.taskName.trim(),
          complete: this.status === 'Complete'
        }
      )

      this.blockstack.putFile(projectFileName + '.json', JSON.stringify(this[projectFileName]), this[projectFileName].isEncrypted ? this.encryptOption : undefined)
      this.$forceUpdate() // Vuejs method to update component
    },
    // function to add new project to projects file
    addProject () {
      this.createProjectModal = false
      let isEncrypted = Boolean
      if (!this.project.trim()) {
        return
      }
      if (this.encryptionStatus === 'Public') {
        isEncrypted = false
      } else {
        isEncrypted = true
      }
      this.projects.unshift({
        id: Date.now(), // making unique ids with milisecond timestamp
        text: this.project.trim(),
        completed: false,
        manager: this.user.username,
        isEncrypted: isEncrypted
      })
      //  creating new json file with required data format for newly created project
      let options = {
        encrypt: true
      }
      this.blockstack.putFile(this.projects[0].id + '.json', JSON.stringify(this.projects[0]), this.projects[0].isEncrypted ? options : undefined)

      this[this.projects[0].id] = Object.assign({}, this.projects[0])
      this.$set(this[this.projects[0].id], 'tasks', [])

      this.project = ''
      this.encryptionStatus = 'Public'
      // making entry for tasks of new project in task array
      this.taskArray.push(this[this.projects[0].id])
      // updating projects list
      this.updateProjectList(this.projects)
    },
    // function for changing task status according to the on/off switch in createTaskModal
    changeStatus (info) {
      if (info.value === true) {
        this.status = 'Complete'
        this.complete = true
      } else {
        this.status = 'Incomplete'
        this.complete = false
      }
    },
    changeEncryption (info) {
      if (info.value === true) {
        this.encryptionStatus = 'Private'
        this.complete = true
      } else {
        this.encryptionStatus = 'Public'
        this.complete = false
      }
    },
    // function for setting default values and opening CreateTaskModal
    addTask (project) {
      this.selectedProject = project
      this.taskName = ''
      this.status = 'Incomplete'
      this.createTaskModal = true
    },
    // function for opening edit task modal with parameters according to selected task
    editTask (task, index, project) {
      this.taskName = task.name
      if (task.complete === true) {
        this.complete = true
        this.status = 'Complete'
      } else {
        this.complete = false
        this.status = 'Incomplete'
      }
      this.taskIndex = index
      this.taskProject = project
      this.editTaskModal = true
    },
    // function for updating task in local array and blockstack
    updateTask () {
      // for local array of project file
      this[this.taskProject.id].tasks[this.taskIndex].name = this.taskName
      this[this.taskProject.id].tasks[this.taskIndex].complete = this.complete
      // putting in blockstack
      this.blockstack.putFile(this.taskProject.id + '.json', JSON.stringify(this[this.taskProject.id]), this[this.taskProject.id].isEncrypted ? this.encryptOption : undefined)
      this.$forceUpdate() // Vuejs method to update component
      this.editTaskModal = false
    },
    // function for deleting task
    deleteTask (index, project) {
      this[project.id].tasks.splice(index, 1)
      this.blockstack.putFile(project.id + '.json', JSON.stringify(this[project.id]), this[project.id].isEncrypted ? this.encryptOption : undefined)
      this.$forceUpdate()
    },

    // function for updating projects file containing project list
    updateProjectList (projects) {
      this.blockstack.putFile(STORAGE_FILE, JSON.stringify(projects))
    },

    // function for fetchin data project list and their unique json files
    fetchProjectFile () {
      let options = {
        decrypt: true
      }
      // fetching project list
      this.blockstack.getFile(STORAGE_FILE)
      .then((projectsText) => {
        this.projects = JSON.parse(projectsText || '[]')
        this.taskArray = []
        // parsing blockstack gaia hub cong from localhost for creating hub url
        let urlItems = JSON.parse(localStorage['blockstack-gaia-hub-config'])
        // creating hub url(where our files are stored)
        this.hubUrl = urlItems.url_prefix + urlItems.address + '/'
        // looping over project list to fetch unique json files for every project
        for (var i = 0; i < this.projects.length; i++) {
          this.blockstack.getFile(this.projects[i].id + '.json', this.projects[i].isEncrypted ? options : undefined).then((data1) => {
            let data = typeof data1 === 'string' ? JSON.parse(data1) : {}
            this[data.id] = data
            this[data.id].tasks = this[data.id].tasks || []
            // creating task array for listing tasks under their respective project
            this.taskArray.push(data)
          })
        }
      })
    },

    signOut () {
      this.blockstack.signUserOut(window.location.href)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/sass/main.scss";
@import "../assets/sass/dictionary.scss";

  input::placeholder {
    color: grey;
  }
 
  
  .md-field .md-input, .md-field .md-textarea {
    color: gray;
    font-weight: 400
  }

  .md-dialog-actions .md-button  {
    min-width: 30%;
  }
  
  label {
    margin-bottom: 0;
    cursor: pointer;
    input[type="checkbox"] {
      margin-right: 5px;
    }
  }
  
</style>
