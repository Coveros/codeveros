node {
    checkout scm

    dir('services/ui/angular') {
        stage('dependencies') {
            docker.image('node:14.16').inside {
                sh 'npm ci --quiet --cache="./npm"'
            }
        }
        
        stage('build') {
            echo 'Sup'
        }

        stage('lint') {
            try {
                echo 'linting'
            } catch (Exception e) {
                echo 'Failed linting' + e.toString()
            }
        }
    }
    
}
