node {
    checkout scm
    dir('services/ui/angular'){
        stage('Dependencies'){
            docker.image('node:14.16').inside { //creates node in docker then go inside
                //run these
                sh 'npm ci --quiet --cache="./npm"'  //copies the user, mounts the directories, maps it to the exact same location as node agent, gives permissions\
                //define location of cache files to be in the workspace.
            }
        }
        stage('Build') {
            echo 'Hello World'
        }
        stage('lint') {
            try{
                echo 'Linting'
            }catch(Exception e) {
                echo 'Failed linting ' + e.toString()
            }
        }
    }
}