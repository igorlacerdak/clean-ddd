import { Either, right } from '@/core/either';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[];
  }
>;

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  public async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuesitonId(questionId, {
        page,
      });

    return right({ questionComments });
  }
}