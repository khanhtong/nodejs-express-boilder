import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string()
    .required()
    .description('Mongo DB host url'),
  MONGO_HOST_TEST: Joi.string()
    .required()
    .description('Mongo DB test host url'),
  MONGO_PORT: Joi.number()
    .default(27017)
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const mongoUri = envVars.NODE_ENV === 'test' ? envVars.MONGO_HOST_TEST : envVars.MONGO_HOST;
export const env = envVars.NODE_ENV;
export const port = envVars.PORT;
export const mongooseDebug = envVars.mongooseDebug;
export const jwtSecret = envVars.JWT_SECRET;
