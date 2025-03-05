export class CustomError {
    message!: any;
    status!: number;
    additionalInfo!: any;

    constructor(message: any, status: number = 500, additionalInfo: any = {}) {
        let finalMessage =
            typeof message === "string"
                ? message
                : message.meta
                ? message.meta.cause
                : message.message;

        this.message = finalMessage;
        this.status = status;
        this.additionalInfo = additionalInfo;
    }
}
