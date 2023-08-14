import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answers-repository';
import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionUseCaseResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute({
    authorId,
    content,
    title,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    });

    await this.questionsRepository.create(question);

    return { question };
  }
}