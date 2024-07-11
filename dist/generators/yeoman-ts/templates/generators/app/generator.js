import YeomanGenerator from 'yeoman-generator';
export default class AppGenerator extends YeomanGenerator {
    constructor(args, options) {
        super(args, options);
    }
    method1() {
        this.log('method 1 just ran');
    }
    method2() {
        this.log('method 2 just ran');
    }
}
