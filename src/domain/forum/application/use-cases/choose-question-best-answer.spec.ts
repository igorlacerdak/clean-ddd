import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { makeQuestion } from 'test/factories/make-question';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryQuestionRepository
    );
  });

  it('should to be able to choose question best answer', async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id);
  });

  it('should not be able to chose another user questio best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    });
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(async () => {
      await sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
