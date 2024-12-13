import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ResponseService } from './response.service';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post('submit')
  async submitResponse(
    @Body() { userId, surveyId, answers }: { userId: string; surveyId: string; answers: any },
  ) {
    return this.responseService.submitResponse(userId, surveyId, answers);
  }

  @Post('create') // POST /response/create
  async createResponse(@Body() createResponseDto: any) {
    return this.responseService.createResponse(createResponseDto);
  }

  @Get('survey/:surveyId')
  async listResponsesBySurvey(@Param('surveyId') surveyId: string) {
    return this.responseService.listResponsesBySurvey(surveyId);
  }

  @Get('user/:userId')
  async listResponsesByUser(@Param('userId') userId: string) {
    return this.responseService.listResponsesByUser(userId);
  }
}
