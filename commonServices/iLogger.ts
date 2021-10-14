export interface ILogger {
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    verbose(message: string): void;
}
