public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world");
    }
}

pipeline {
agent any
stages {
stage ('clone') {
steps {
sh
"rm -rf *"
sh "git clone https://github.com/priximmo/jenkins-helloworld"
｝
}
stage ('build') {
steps {
sh "cd jenkins-helloworld/ && javac Main.java"
｝
}
stage('run') {
steps {
sh "cd jenkins-helloworld/ && java Main"
}
｝