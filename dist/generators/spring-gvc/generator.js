import YeomanGenerator from 'yeoman-generator';
import _ from 'lodash';
/**
 * Spring Boot App with Gradle Version Catalog Generator
 */
export default class SpringBootAppWithGvcGenerator extends YeomanGenerator {
    // _prompts;
    _project;
    constructor(args, options) {
        super(args, options);
    }
    async prompting() {
        const currentDirectoryName = this.env.cwd.replace(/^.*[\\\\|\\\/]/, '');
        const answers = await this.prompt([
            {
                type: "input",
                name: 'project_group',
                message: 'Group name:',
                default: this.config.get('project_group') || 'com.example'
            },
            {
                type: "input",
                name: 'project_name',
                message: 'project name:',
                default: this.config.get('project_name') || currentDirectoryName
            },
            {
                type: "input",
                name: 'project_version',
                message: 'Version:',
                default: this.config.get('project_version') || '0.0.1-SNAPSHOT'
            },
            {
                type: "input",
                name: 'base_package',
                message: 'Base package:',
                default: this.config.get('base_package') || 'com.example'
            },
            {
                type: "input",
                name: 'main_app',
                message: 'Main application name:',
                default: this.config.get('main_app') || _.upperFirst(_.camelCase(currentDirectoryName)) + 'Application'
            },
            {
                type: "input",
                name: 'gvc_name',
                message: 'Gradle Version Catalog name:',
                default: this.config.get('gvc_name') || 'libs'
            }
        ]);
        this.config.set(answers);
        this.config.save();
        this._project = {
            group: answers.project_group,
            name: answers.project_name,
            version: answers.project_version,
            basePackage: answers.base_package,
            mainApp: answers.main_app,
            gvcName: answers.gvc_name
        };
    }
    generateFiles() {
        this.log("generateFiles()...");
        this.log(`appname: ${this.appname}`);
        const projectFiles = [
            ".gitignore",
            // "package-lock.json",
            "build.gradle.kts",
            "gradle.properties",
            "gradlew",
            "gradlew.bat",
            "settings.gradle.kts",
            "gradle/wrapper/gradle-wrapper.jar",
            "gradle/wrapper/gradle-wrapper.properties",
        ];
        this.log(`files: ${projectFiles}`);
        projectFiles.forEach(file => {
            this.fs.copyTpl(this.templatePath(file), this.destinationPath(`./${file}`), {
                project: this._project,
            });
        });
        const basePackage = this._project?.basePackage;
        const mainApp = this._project?.mainApp;
        const basePackageDir = `src/main/java/${basePackage.replace(/\./g, '/')}`;
        const mainJavaFiles = [
            { src: 'main_java/Application.java', dest: `${basePackageDir}/${mainApp}.java` }
        ];
        const mainResourceFiles = [
            { src: 'main_resources/application.yml', dest: 'src/main/resources/application.yml' }
        ];
        // concat mainJavaFiles and mainResourceFiles
        const mainFiles = mainJavaFiles.concat(mainResourceFiles);
        mainFiles.forEach(file => {
            this.fs.copyTpl(this.templatePath(file.src), this.destinationPath(file.dest), {
                project: this._project,
            });
        });
    }
}
// interface GradleVersionCatalogProject {
//     group: string;
//     name: string;
//     version: string;
//     // constructor(public name: string, public group: string, public version: string) {
//     // }
// }
