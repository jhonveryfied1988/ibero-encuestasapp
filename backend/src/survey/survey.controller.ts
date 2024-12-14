import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('create')
  async createSurvey(
    @Body() { userId, title, questions }: { userId?: string; title: string; questions: any[] },
  ) {
    const defaultUserId = '122a6530-c88c-4c50-af6c-3ce96a95f3a1'; // Usuario predeterminado
    const finalUserId = userId || defaultUserId; // Usar el proporcionado o el predeterminado

    return this.surveyService.createSurvey(finalUserId, title, questions);
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

  @Get('results/:id')
  async getSurveyResults(@Param('id') surveyId: string) {
    return this.surveyService.getSurveyResults(surveyId);
  }


}
