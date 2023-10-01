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

        stage('Build') {
            steps {
                sh 'npm run build'
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
        rm -rf /opt/robotenv
        /usr/bin/python3.11 -m venv /opt/robotenv
        /opt/robotenv/bin/pip install robotframework-browser
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



