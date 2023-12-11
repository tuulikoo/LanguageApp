pipeline {
agent any
environment {
    NODE_ENV = 'dev'
}
triggers {
    pollSCM('H H/5 * * *') // Poll SCM every 5 hours
}
stages {
    stage('Checkout Code') {
        steps {
            git 'https://github.com/tuulikoo/LanguageApp.git'
        }
    }
    stage('Setup Environment') {
        steps {
            nodejs(nodeJSInstallationName: 'Node') {
                sh 'npm install -g bun'
                    sh 'bun install'
                    sh 'bun run test'
                }
            }
        }
        stage('Setup Robot Framework') {
            steps {
                dir('robot') {
            // Use the same nodejs block to get the correct PATH
                    nodejs(nodeJSInstallationName: 'Node') {
                        sh '''#!/bin/bash
                         python3 -m venv venv_robot
                         source venv_robot/bin/activate

                    # PATH is already correctly set by the nodejs block
                         pip3 install robotframework robotframework-browser robotframework-seleniumlibrary
                         rfbrowser init
                        '''
                    }
                }
            }
        }

       stage('Run Next.js App') {
            steps {
                sh '''
                    npm start > app.log 2>&1 &
                    echo $! > PID
                    sleep 15
                '''
            }
        }
        stage('Run Robot Tests') {
            steps {
                nodejs(nodeJSInstallationName: 'Node') {
                dir('robot') {
                    sh '''#!/bin/bash
                        source venv_robot/bin/activate
                        robot .
                    '''
                }
            }
        }
    }
        stage('Build and Deploy') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
        stage('Cleanup') {
            steps {
                sh 'docker system prune -af --volumes'
            }
        }
    }
    post {
        always {
            sh 'cat app.log || true'
            sh 'if [ -f PID ]; then kill $(cat PID) || true; rm PID; fi'
            robot outputPath: 'robot', logFileName: 'log.html', outputFileName: 'output.xml', reportFileName: 'report.html'
        }
    }
}

