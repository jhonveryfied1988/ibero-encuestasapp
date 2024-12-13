import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('create')
  async createSurvey(
    @Body() { userId, title, questions }: { userId: string; title: string; questions: any[] },
  ) {
    return this.surveyService.createSurvey(userId, title, questions);
  }

  @Get('list')
  async listSurveys() {
    return this.surveyService.listSurveys();
  }

  @Get(':id')
  async getSurveyById(@Param('id') id: string) {
    return this.surveyService.getSurveyById(id);
  }

  @Put('update/:id')
  async updateSurvey(
    @Param('id') id: string,
    @Body() { title, questions }: { title: string; questions: any[] },
  ) {
    return this.surveyService.updateSurvey(id, title, questions);
  }

  @Put('deactivate/:id')
  async deactivateSurvey(@Param('id') id: string) {
    return this.surveyService.deactivateSurvey(id);
  }

  @Delete(':id')
  async deleteSurvey(@Param('id') id: string) {
    return this.surveyService.deleteSurvey(id);
  }
}
