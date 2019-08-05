import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Validates all needed variables and returns the validated object
   * @param envConfig
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number().default(3000),
      API_AUTH_ENABLED: Joi.boolean().required(),
      CLIENT_ID: Joi.string(),
      CLIENT_SECRET: Joi.string(),
      JWT_SECRET_KEY: Joi.string(),
    });

    const { error, value: validateEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validateEnvConfig;
  }

  /**
   * @DEPRECATED for now
   * Get environment variable
   * @param key
   */
  get(key: string): string {
    return this.envConfig[key];
  }

  get isApiAuthEnabled(): boolean {
    return Boolean(this.envConfig.API_AUTH_ENABLED);
  }

  get clientId(): string {
    return this.envConfig.CLIENT_ID;
  }

  get clientSecret(): string {
    return this.envConfig.CLIENT_SECRET;
  }

  get jwtSecretKey(): string {
    return this.envConfig.JWT_SECRET_KEY;
  }
}
