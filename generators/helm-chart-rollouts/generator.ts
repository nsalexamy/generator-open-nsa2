
import YeomanGenerator, { type BaseOptions } from 'yeoman-generator';
import fs from 'fs';


interface TemplatesVariables {
    appName: string;
    chartVersion: string;
    imageRepository: string;
    imageTag: string;       // it can be used as appVersion.
    servicePort: number;
}

export default class extends YeomanGenerator<BaseOptions> {

    _templatesVariables: TemplatesVariables | undefined;

    constructor(args: string | string[], options: BaseOptions) {
        super(args, options);
        let __appName = "";
        const currentDirectory = this.env.cwd.replace(/^.*[\\\\|\\\/]/, '');

        if (args && args.length > 0) {

            if (args[0] === "." || args[0] === "./") {
                __appName = currentDirectory;

            } else {

                this.destinationRoot(this.destinationPath(args[0]));
                // last part of the path
                // chart-home/your-chart-name -> your-chart-name    
                __appName = args[0].split('/').pop() || args[0];
            }

        } else {
            __appName = currentDirectory;
            // current directory is the destination root
        }




        this._templatesVariables ??= {
            appName: __appName,
            chartVersion: this.options['chart-version'] || "0.1.0",
            imageRepository: this.options['image-repository'] || "nginx",
            imageTag: this.options['image-tag'] || "",
            servicePort: this.options['service-port'] || 80
        };



        this.log("Destination root: ", this.destinationRoot());
        this.log("Generating helm chart for ", this._templatesVariables.appName);
        this.log("Template Variables:", JSON.stringify(this._templatesVariables));
    }

    generateFiles() {
        this.log("generateFiles()...");

        const helmChartFiles = [
            ".helmignore",
            "Chart.yaml",
            "values.yaml",
            "templates/_helpers.tpl",
            "templates/_service.tpl",
            "templates/deployment.yaml",
            "templates/hpa.yaml",
            "templates/ingress.yaml",
            "templates/NOTES.txt",
            "templates/rollout.yaml",
            //"templates/role.yaml",
            //"templates/rolebinding.yaml",
            "templates/service-preview.yaml",
            "templates/service.yaml",
            "templates/serviceaccount.yaml",
            "templates/tests/test-connection.yaml",
        ];

        // this.log(`files: ${helmChartFiles}`);


        helmChartFiles.forEach(file => {

            this.fs.copyTpl(
                this.templatePath(`${file}`),
                this.destinationPath(`${file}`),
                {
                    ...this._templatesVariables,
                }
            );
        });
    }
}