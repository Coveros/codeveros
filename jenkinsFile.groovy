node {
    checkout scm
    
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
