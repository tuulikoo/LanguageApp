pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: '*/ui/ux']], 
                    doGenerateSubmoduleConfigurations: false, 
                    extensions: [], 
                    submoduleCfg: [], 
                    userRemoteConfigs: [[url: 'https://github.com/tuulikoo/LanguageApp.git']]
                ])
            }
        }

        stage('Setup Environment') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: 'Node20', configId: null) {
                        sh 'npm ci'
                    }
                }
            }
        }

       

        stage('Node.js Tests'){
            steps{
                sh 'npm test'
            }
        }

        stage('Setup Robot Environment') {
    steps {
        sh '''
        # Source the virtual environment using the . operator
        . /opt/robotenv/bin/activate
        
        # Check if robotframework-browser is installed, and if not, install it
        if ! /opt/robotenv/bin/pip show robotframework-browser > /dev/null 2>&1; then
            /opt/robotenv/bin/pip install robotframework-browser
        fi
        
        # Initialize the robot framework browser if needed
        /opt/robotenv/bin/rfbrowser init
        '''
    }
}


     

        stage('Robot Framework Tests') { 
            steps {
                sh '/opt/robotenv/bin/robot -d ${WORKSPACE}/robot ${WORKSPACE}/robot'
            }
            post {
                always {
                    robot(
                        outputPath: "${WORKSPACE}/output",
                        outputFileName: 'output.xml',
                        reportFileName: 'report.html',
                        logFileName: 'log.html',
                        passThreshold: 0,    
                        unstableThreshold: 0 
                    )
                }
            }
        }
    }
}



