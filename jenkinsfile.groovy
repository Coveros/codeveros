node {
    checkout
    stage('Build') {
         echo 'Hello World'          
    }
    stage('lint') {
        try {
                echo 'linting'   
        } catch (Exception e) {
                    echo 'Failed linting' + e.toString()
        }
    }
}