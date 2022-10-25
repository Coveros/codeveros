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
            echo 'Hello world, testing changes'
            docker.image('node:14.16').inside {
                sh 'npm run build.production --cache="./npm"'
            }    
        }
        stage('Lint') {
            try {
                echo 'linting'
            } catch(Exception e) {
                echo 'Failed linting ' + e.toString()
            }
        }
        stage('test') {
            docker.image('buildkite/puppeteer:8.0.0').inside {
                sh 'npm run test --cache="./npm"'
            }    
        }
        stage('deliver') {
            if(env.BRANCH_NAME=='master') {
                docker.withRegistry('', 'dockerhub') {
                    def myImage = docker.build("gliang1/ui:${env.BUILD_ID}") //dockerhub username followed by ui - create an image that has a name of dockerhub - gliang1 - ui
                    // return all the info into the variable myImage
                    myImage.push()
                    myImage.push('latest') //override docker latest tag - tag it with build ID with the latest tag  
                }
            }
        }
    }
}


