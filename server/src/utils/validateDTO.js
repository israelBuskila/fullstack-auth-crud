"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDTO = validateDTO;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validateDTO(DTOClass, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const dtoInstance = (0, class_transformer_1.plainToInstance)(DTOClass, payload);
        try {
            yield (0, class_validator_1.validateOrReject)(dtoInstance, {
                whitelist: true,
                forbidNonWhitelisted: true,
            });
            return dtoInstance;
        }
        catch (errors) {
            const validationErrors = formatValidationErrors(errors);
            throw new Error(validationErrors.join("; "));
        }
    });
}
const formatValidationErrors = (errors) => {
    const errorMessages = [];
    const processError = (error, path = "") => {
        if (error.constraints) {
            const constraintMessages = Object.values(error.constraints);
            errorMessages.push(`${path}${error.property}: ${constraintMessages.join(", ")}`);
        }
        if (error.children && error.children.length > 0) {
            error.children.forEach((childError) => {
                const newPath = path
                    ? `${path}${error.property}.`
                    : `${error.property}.`;
                processError(childError, newPath);
            });
        }
    };
    errors.forEach((error) => processError(error));
    return errorMessages;
};
