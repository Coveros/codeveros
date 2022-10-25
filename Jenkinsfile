node {
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


