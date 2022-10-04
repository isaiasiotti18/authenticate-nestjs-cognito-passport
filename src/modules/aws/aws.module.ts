import { AwsConfig } from './aws.config';
import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';

@Module({
  controllers: [],
  providers: [AwsService, AwsConfig],
  exports: [AwsService, AwsConfig],
})
export class AwsModule {}
