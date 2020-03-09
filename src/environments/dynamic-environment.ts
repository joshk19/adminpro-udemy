import { environment } from './environment';
declare var window: any;

export class DynamicEnvironment {
    public get environment() {
        return window.config.environment;
    }

    public get configMessage() {
        return window.config.message;
    }
}