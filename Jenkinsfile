node {
	checkout scm
	stage('Build') {
		echo 'Hello World'
	}
	stage('lint') {
		try {
			echo 'lint'
		} catch(Exception e) {
			echo 'Failed linting ' + e.toString()
		}
	}
}