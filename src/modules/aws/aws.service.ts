import { LoginRequestBody } from './../auth/interfaces/login-request-body';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { AwsConfig } from './aws.config';
import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';

@Injectable()
export class AwsService {
  private userPool: CognitoUserPool;

  constructor(private readonly awsConfig: AwsConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.awsConfig.userPoolId,
      ClientId: this.awsConfig.clientId,
    });
  }

  async register(createUserDto: CreateUserDto) {
    const { email, hash_password } = createUserDto;
    const password = hash_password;

    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        email,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  authenticateUserAwsCognito(authenticateRequest: LoginRequestBody) {
    const { email, password } = authenticateRequest;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
