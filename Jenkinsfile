node {
    stage('cleanup') { // should be in the beginning of the pipeline
        cleanWs() // clean workspace - ensures every time we build it, we pull the latest dependencies since we cleaned workspace
    }
    checkout scm
    dir('services/ui/angular') {
        stage('Dependencies') {
            // install node
            docker.image('node:14.16').inside {
                // sh step to install dependencies 
                sh 'npm ci --quiet --cache="./npm"' //cache tells jenkins to store any cache files to its local workspace that it's in.
            }
        }
        stage('Build') {
            echo 'Hello World'
            sh 'npm run build.production --cache="./npm"'
        }
        stage('Lint') {
            try {
                echo 'linting'
            } catch(Exception e) {
                echo 'Failed linting ' + e.toString()
            }
        }
    }
}


