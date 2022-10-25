node {
    stage('cleanUp') {
        cleanWs()
    }

    checkout scm

    dir('services/ui/angular') {
/*
        stage('dependencies') {
            docker.image('node:14.16').inside {
                sh 'npm ci --quiet --cache="./npm"'
            }
        }
        
        stage('build') {
            docker.image('node:14.16').inside {
                sh 'npm run build.production --cache="./npm"'
            }
        }
/*
        stage('lint') {
            try {
                echo 'linting'
            } catch (Exception e) {
                echo 'Failed linting' + e.toString()
            }
        }

        stage('test') {
            docker.image('buildkite/puppeteer:8.0.0').inside {
                sh 'npm run test --cache="./npm"'
            }
        }
        */
        stage('deliver') {
            if(env.BRANCH_NAME == 'master') {
                docker.withRegistry('', 'docker') {
                    def myImage = docker.build("rawrool/ui:${env.BUILD_ID}")
                    myImage.push()
                    myImage.push('latest')
                }
            }
        }
    }
}
