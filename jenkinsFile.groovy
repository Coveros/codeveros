node {}

stage('build') {
    echo 'Sup'

    checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'rawrool1', url: 'https://github.com/rawrool/codeveros.git']]])
}

stage('lint') {
    try {
        echo 'linting'
    } catch (Exception e) {
        echo 'Failed linting' + e.toString()
    }
}
