import YeomanGenerator, { type BaseOptions } from 'yeoman-generator';
import {PromptQuestion, PromptQuestions} from "@yeoman/types";




export default class GradleVersionCatalogGenerator extends YeomanGenerator {

    // _prompts;
    _project: { group: string; name: string; version: string; } | undefined;

    constructor(args: string, options: BaseOptions) {
        super(args, options);


    }
    async prompting() {
        const currentDirectoryName = this.env.cwd.replace(/^.*[\\\\|\\\/]/, '');

        // const questions: PromptQuestions = {
        // }
        //
        // const prompts: PromptQuestion[] = [
        // ]
        // const prompts: PromptQuestion[] = [
        //     {
        //         type: 'string',
        //         name: 'project_group',
        //         message: 'Group name:',
        //         default: this.config.get('project_group') || 'com.example'
        //     },
        //     {
        //         type: 'string',
        //         name: 'project_name',
        //         message: 'project name:',
        //         default: this.config.get('project_name') || currentDirectoryName
        //     },
        //     {
        //         type: 'string',
        //         name: 'project_version',
        //         message: 'Version:',
        //         default: this.config.get('project_version') || '0.0.1-SNAPSHOT'
        //     }
        // ];
        // return this.prompt(questions).then(answers => {
        //     this.config.set(answers);
        //
        //     this._project =  {
        //         group: answers.project_group,
        //         name: answers.project_name,
        //         version: answers.project_version
        //     };
        // });

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
                }
        ]);

        this.config.set(answers);
        this.config.save();

        this._project = {
                    group: answers.project_group,
                    name: answers.project_name,
                    version: answers.project_version
        };
    }
    generateFiles() {
        this.log("generateFiles()...");
        this.log(`appname: ${this.appname}`);

        const files = [
            ".gitignore",
            // "package-lock.json",
            "build.gradle.kts",
            "gradle.properties",
            "gradlew",
            "gradlew.bat",
            "libs.versions.toml",
            "settings.gradle.kts",
            "gradle/wrapper/gradle-wrapper.jar",
            "gradle/wrapper/gradle-wrapper.properties",
        ];

        this.log(`files: ${files}`);

        files.forEach(file => {

           this.fs.copyTpl(
               this.templatePath(file),
               this.destinationPath(`./${file}`),
               {
                    project: this._project,
               }
           );
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