import assert from "assert";

import dotenv from 'dotenv';
dotenv.config()

const {
  PORT,
  HOST,
  HOST_URL,
  COOKIE_ENCRYPT_PWD,
  SQL_SERVER,
  SQL_DATABASE,
  SQL_USER,
  SQL_DIALECT,
  SQL_PASSWORD,
  OKTA_ORG_URL,
  OKTA_CLIENT_ID,
  OKTA_CLIENT_SECRET,
  PRIVATE_KEY,
  EMAIL_SYSTEM,
  PASSWORD_EMAIL_SYSTEM,
  
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert( PORT, "PORT configuration is required." );
assert( HOST, "HOST configuration is required." );
assert( HOST_URL, "HOST_URL configuration is required." );
assert( COOKIE_ENCRYPT_PWD, "COOKIE_ENCRYPT_PWD configuration is required." );
assert( SQL_SERVER, "SQL_SERVER configuration is required." );
assert( SQL_DATABASE, "SQL_DATABASE configuration is required." );
assert( SQL_USER, "SQL_USER configuration is required." );
assert( SQL_PASSWORD, "SQL_PASSWORD configuration is required." );
assert( OKTA_ORG_URL, "OKTA_ORG_URL configuration is required." );
assert( OKTA_CLIENT_ID, "OKTA_CLIENT_ID configuration is required." );
assert(OKTA_CLIENT_SECRET, "OKTA_CLIENT_SECRET configuration is required.");
assert(PRIVATE_KEY, "PRIVATE_KEY configuration is required.");
assert(EMAIL_SYSTEM, "EMAIL_SYSTEM configuration is required.");
assert(PASSWORD_EMAIL_SYSTEM, "PASSWORD_EMAIL_SYSTEM configuration is required.");

const jsonConfig = {
  email_system: EMAIL_SYSTEM,
  password_email_system: PASSWORD_EMAIL_SYSTEM,
  private_key: PRIVATE_KEY,
  port: Number.parseInt(PORT),
  host: HOST,
  url: HOST_URL,
  cookiePwd: COOKIE_ENCRYPT_PWD,

  sql: {
    server: SQL_SERVER,
    database: SQL_DATABASE,
    user: SQL_USER,
    dialect: SQL_DIALECT,
    password: SQL_PASSWORD,
      options: {
        encrypt: sqlEncrypt
      }
  },
  okta: {
    url: OKTA_ORG_URL,
    clientId: OKTA_CLIENT_ID,
    clientSecret: OKTA_CLIENT_SECRET
  }
}

export default {
  jsonConfig
};

