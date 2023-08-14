import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteAnswerUseCase } from './delete-answer';
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { makeAnswer } from 'test/factories/make-answer';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
  });

  it('should to be able to delete a question', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answerId-1')
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      answerId: 'answerId-1',
      authorId: 'author-1',
    });

    expect(inMemoryAnswerRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a question from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answerId-1')
    );

    await inMemoryAnswerRepository.create(newAnswer);

    expect(async () => {
      await sut.execute({
        answerId: 'question-1',
        authorId: 'author-2',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
