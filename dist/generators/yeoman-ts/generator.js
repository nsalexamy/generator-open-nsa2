import YeomanGenerator from 'yeoman-generator';
export default class YeomanTypescriptGenerator extends YeomanGenerator {
    constructor(args, options) {
        super(args, options);
    }
    generateFiles() {
        this.log("generateFiles()...");
        const currentDirectoryName = this.env.cwd.replace(/^.*[\\\\|\\\/]/, '');
        this.log(`currentDirectoryName: ${currentDirectoryName}`);
        this.log(`appname: ${this.appname}`);
        const files = [
            ".gitignore",
            "package.json",
            // "package-lock.json",
            "tsconfig.json",
        ];
        // this.log(`files: ${files}`);
        files.forEach(file => {
            this.fs.copyTpl(this.templatePath(file), this.destinationPath(`./${file}`), {
                "nsa2_generatorName": currentDirectoryName,
            });
        });
        const generatorFiles = [
            "generators/app/generator.ts",
            "generators/app/index.ts",
            "generators/app/types-export.d.ts",
            "generators/gradle-version-catalog/generator.ts",
            "generators/gradle-version-catalog/index.ts",
            "generators/gradle-version-catalog/types-export.d.ts",
            "generators/gradle-version-catalog/templates/.gitignore",
            "generators/gradle-version-catalog/templates/build.gradle.kts",
            "generators/gradle-version-catalog/templates/gradle.properties",
            "generators/gradle-version-catalog/templates/gradlew",
            "generators/gradle-version-catalog/templates/gradlew.bat",
            "generators/gradle-version-catalog/templates/libs.versions.toml",
            "generators/gradle-version-catalog/templates/settings.gradle.kts",
            "generators/gradle-version-catalog/templates/gradle/wrapper/gradle-wrapper.jar",
            "generators/gradle-version-catalog/templates/gradle/wrapper/gradle-wrapper.properties",
            "generators/spring-gvc/generator.ts",
            "generators/spring-gvc/index.ts",
            "generators/spring-gvc/types-export.d.ts",
            "generators/spring-gvc/templates/.gitignore",
            "generators/spring-gvc/templates/build.gradle.kts",
            "generators/spring-gvc/templates/gradle.properties",
            "generators/spring-gvc/templates/gradlew",
            "generators/spring-gvc/templates/gradlew.bat",
            "generators/spring-gvc/templates/settings.gradle.kts",
            "generators/spring-gvc/templates/gradle/wrapper/gradle-wrapper.jar",
            "generators/spring-gvc/templates/gradle/wrapper/gradle-wrapper.properties",
            "generators/spring-gvc/templates/main_java/Application.java",
            "generators/spring-gvc/templates/main_resources/application.yml",
        ];
        generatorFiles.forEach(file => {
            this.fs.copy(this.templatePath(file), this.destinationPath(`./${file}`));
        });
        // this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath(`./package.json`), {
        //     "nsa2_generatorName": "generator_nick",
        // });
    }
}
