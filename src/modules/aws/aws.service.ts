import { CreateUserDto } from './../users/dto/create-user.dto';
import { AwsConfig } from './aws.config';
import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthRequestDto } from '../auth/dtos/auth-request.dto';

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
    const { name, email, hash_password } = createUserDto;
    const password = hash_password;

    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        name,
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

  authenticateUserAwsCognito(authenticateRequest: AuthRequestDto) {
    const { name, password } = authenticateRequest;

    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });

    const userData = {
      Username: name,
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
