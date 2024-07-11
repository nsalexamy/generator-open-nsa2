import YeomanGenerator, { type ComposeOptions, type Storage, type BaseOptions } from 'yeoman-generator';

export default class AppGenerator extends YeomanGenerator {
    constructor(args: string, options: BaseOptions) {
        super(args, options);
    }

    method1() {
        this.log('method 1 just ran')
    }

    method2() {
        this.log('method 2 just ran')
    }

}